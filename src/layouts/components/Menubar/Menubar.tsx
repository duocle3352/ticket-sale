import classNames from 'classnames/bind'
import routes from '~/configs/routes'
import { MenuItem } from '../MenuItem'
import { HomeIcon, ListIcon, SettingIcon, TicketIcon } from '~/components/Icons'
import { Logo } from '~/components/Logo'
import styles from './Menubar.module.scss'

const cx = classNames.bind(styles)

function Menubar() {
  return (
    <div>
      <Logo className={cx('logo')} />
      <MenuItem title='Trang chủ' route={routes.home} module='parent' icon={<HomeIcon />} />
      <MenuItem title='Quản lý vé' route={routes.manage} module='parent' icon={<TicketIcon />} />
      <MenuItem title='Đối soát vé' route={routes.check} module='parent' icon={<ListIcon />} />
      <MenuItem
        title='Cài đặt'
        route={routes.setting}
        module='parent'
        icon={<SettingIcon />}
        child={<MenuItem title='Gói dịch vụ' module='child' route={routes.setting_package} />}
      />
    </div>
  )
}

export default Menubar
