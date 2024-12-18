import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { BadgeCheck, ChartNoAxesCombined, LayoutDashboardIcon, ShoppingBasket } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';

const adminSideBarMenuItems = [
  {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/admin/dashboard',
      icons: <LayoutDashboardIcon />
  },
  {
      id: 'products',
      label: 'Products',
      path: '/admin/products',
      icons: <ShoppingBasket />
  },
  {
      id: 'orders',
      label: 'Orders',
      path: '/admin/orders',
      icons: <BadgeCheck />
  }
];

const MenuItems = ({ setOpen }) => {
  const navigate = useNavigate();
  

  return (
    <nav className="mt-8 flex-col flex gap-2">
      {adminSideBarMenuItems.map(menuItem => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path)
            setOpen ? setOpen(false) : null
          }}
          className="flex text-xl cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          {menuItem.icons}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
};

const AdminSideBar = ({ open, setOpen }) => {
  const navigate = useNavigate();

  return (
    <Fragment>
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className='flex gap-2 mt-5 mb-5'>
                <ChartNoAxesCombined />
                <h1 className="text-2xl font-extrabold">Admin panel</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div onClick={() => navigate('/admin/dashboard')} className="flex cursor-pointer items-center gap-2">
          <ChartNoAxesCombined size={30} />
          <h1 className="text-2xl font-extrabold">Admin panel</h1>
        </div>
        <MenuItems setOpen={setOpen} />
      </aside>
    </Fragment>
  );
};

export default AdminSideBar;
