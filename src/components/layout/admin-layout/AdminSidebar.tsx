import { useRouter } from 'next/router'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import {
  DashboardOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  BarChartOutlined,
  SettingOutlined,
} from '@ant-design/icons'

const AdminSidebar = () => {
  const router = useRouter()

  const items: MenuProps['items'] = [
    {
      key: '/admin',
      icon: <DashboardOutlined />,
      label: '대시보드',
      onClick: () => router.push('/admin'),
    },
    {
      key: '/admin/product',
      icon: <ShoppingOutlined />,
      label: '상품 관리',
      children: [
        {
          key: '/admin/product',
          label: '상품 목록',
          onClick: () => router.push('/admin/product'),
        },
        {
          key: '/admin/product/create',
          label: '상품 등록',
          onClick: () => router.push('/admin/product/create'),
        },
        {
          key: '/admin/product/editor',
          label: '상품 에디터',
          onClick: () => router.push('/admin/product/editor'),
        },
      ],
    },
    {
      key: '/admin/order',
      icon: <ShoppingCartOutlined />,
      label: '주문 관리',
      children: [
        {
          key: '/admin/order',
          label: '주문 목록',
          onClick: () => router.push('/admin/order'),
        },
        {
          key: '/admin/order/process',
          label: '주문 처리',
          onClick: () => router.push('/admin/order/process'),
        },
      ],
    },
    {
      key: '/admin/customer',
      icon: <UserOutlined />,
      label: '고객 관리',
      onClick: () => router.push('/admin/customer'),
    },
    {
      key: '/admin/analytics',
      icon: <BarChartOutlined />,
      label: '통계',
      onClick: () => router.push('/admin/analytics'),
    },
    {
      key: '/admin/settings',
      icon: <SettingOutlined />,
      label: '설정',
      onClick: () => router.push('/admin/settings'),
    },
  ]

  // 현재 경로에 맞는 메뉴 키 찾기
  const getSelectedKey = () => {
    return router.pathname
  }

  // 하위 메뉴가 있는 경우 기본 열린 상태 설정
  const getDefaultOpenKeys = () => {
    if (router.pathname.startsWith('/admin/product')) {
      return ['/admin/product']
    }
    if (router.pathname.startsWith('/admin/order')) {
      return ['/admin/order']
    }
    return []
  }

  return (
    <aside className="admin-sidebar">
      <Menu
        mode="inline"
        selectedKeys={[getSelectedKey()]}
        defaultOpenKeys={getDefaultOpenKeys()}
        style={{ height: '100%', borderRight: 0 }}
        items={items}
        theme="light"
      />
    </aside>
  )
}

export default AdminSidebar
