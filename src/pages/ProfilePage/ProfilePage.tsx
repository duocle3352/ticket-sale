import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

import { RootState } from '~/redux/store'
import { db, storage } from '~/firebaseConfig'
import { setProfileToLS } from '~/util/auth'
import { PageTitle } from '~/components/PageTitle'
import { PageWrapper } from '~/components/PageWrapper'
import { CameraIcon } from '~/components/Icons'
import { Label } from '~/components/Label'
import User from '~/types/user.type'
import styles from './ProfilePage.module.scss'

const cx = classNames.bind(styles)

function ProfilePage() {
  const profile: User | null = useSelector((state: RootState) => state.authenticate.profile)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [per, setPerc] = useState<number>(100)

  useEffect(() => {
    if (avatarFile) {
      const uploadAvatar = () => {
        const name = new Date().getTime() + avatarFile.name
        const storageRef = ref(storage, name)
        const uploadTask = uploadBytesResumable(storageRef, avatarFile)

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            setPerc(progress)
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused')
                break
              case 'running':
                console.log('Upload is running')
                break
            }
          },
          (error) => {
            console.log(error)
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              const userRef = doc(db, 'users', (profile as User).id)
              const upload = async () => {
                await updateDoc(userRef, {
                  avatar: downloadURL
                })
                setProfileToLS({ ...profile, avatar: downloadURL } as User)
              }
              upload()
            })
          }
        )
      }

      uploadAvatar()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatarFile])

  const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAvatarFile(e.target.files[0])
    }
  }

  return (
    <PageWrapper>
      <PageTitle title='Thông tin cá nhân' />
      <div className={cx('container')}>
        <div className={cx('left-content')}>
          <div className={cx('image')}>
            <img src={profile?.avatar} alt={profile?.name} />
            <div className={cx('change-avatar')}>
              <label
                htmlFor='upload-avatar'
                className={cx('change-avatar__label', { disabled: per < 100 })}
              >
                <CameraIcon />
              </label>
              <input
                type='file'
                id='upload-avatar'
                className={cx('change-avatar__input')}
                onChange={handleChangeAvatar}
              />
            </div>
          </div>
          <div className={cx('user-name')}>{profile?.name}</div>
        </div>
        <form className={cx('right-content')}>
          <div className={cx('block')}>
            <div className={cx('item')}>
              <Label label='Tên người dùng:' />
              <div className={cx('description')}>{profile?.name}</div>
            </div>
            <div className={cx('item')}>
              <Label label='Số điện thoại :' />
              <div className={cx('description')}>{profile?.phone}</div>
            </div>
          </div>
          <div className={cx('block')}>
            <div className={cx('item')}>
              <Label label='Email:' />
              <div className={cx('description')}>{profile?.email}</div>
            </div>
            <div className={cx('item')}>
              <Label label='Địa chỉ:' />
              <div className={cx('description')}>{profile?.address}</div>
            </div>
          </div>
        </form>
      </div>
    </PageWrapper>
  )
}

export default ProfilePage
