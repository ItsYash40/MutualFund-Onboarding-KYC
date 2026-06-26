import { useState } from 'react';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      group: 'Today',
      type: 'Action Required: Bank Details',
      message: 'Please update your bank mandate to enable SIP deductions.',
      time: '10:42 AM',
      icon: 'error',
      iconColor: 'text-error dark:text-red-400',
      bgColor: 'bg-error-container/30 dark:bg-red-900/30',
      unread: true
    },
    {
      id: 2,
      group: 'Today',
      type: 'KYC Approved',
      message: 'Your identity verification is complete. You are ready to invest.',
      time: '09:15 AM',
      icon: 'check_circle',
      iconColor: 'text-primary dark:text-primary-fixed',
      bgColor: 'bg-primary-container/20 dark:bg-primary-fixed/20',
      unread: true
    },
    {
      id: 3,
      group: 'Yesterday',
      type: 'Documents Under Review',
      message: 'Our team is reviewing your submitted PAN and Address proof.',
      time: 'Yesterday',
      icon: 'hourglass_empty',
      iconColor: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
      unread: false
    },
    {
      id: 4,
      group: 'Yesterday',
      type: 'KYC Form Submitted',
      message: 'We have successfully received your application. Hang tight.',
      time: 'Yesterday',
      icon: 'description',
      iconColor: 'text-primary dark:text-primary-fixed',
      bgColor: 'bg-primary/10 dark:bg-primary-fixed/10',
      unread: false
    }
  ]);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const todayNotifications = notifications.filter(n => n.group === 'Today');
  const yesterdayNotifications = notifications.filter(n => n.group === 'Yesterday');

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto pt-4 pb-32">
        <header className="mb-10 flex justify-between items-end">
          <div>
            <h2 className="font-[Outfit] text-[28px] md:text-[32px] font-semibold text-on-surface dark:text-white">Notifications</h2>
            <p className="font-[Inter] text-[16px] text-on-surface-variant dark:text-slate-400 mt-1">Stay updated on your investment journey.</p>
          </div>
          <button 
            onClick={markAllAsRead}
            className="font-[Inter] text-[14px] font-medium text-primary dark:text-primary-fixed hover:text-primary-container dark:hover:text-primary-fixed-dim transition-colors hidden sm:block"
          >
            Mark all as read
          </button>
        </header>

        {/* Notification Group: Today */}
        {todayNotifications.length > 0 && (
          <section className="mb-10">
            <h3 className="font-[Inter] text-[14px] font-medium text-outline dark:text-slate-500 tracking-widest uppercase mb-4 ml-2">Today</h3>
            <div className="space-y-3">
              {todayNotifications.map(notification => (
                <div 
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={`bg-surface-container-lowest dark:bg-[#070e12] border border-surface-variant dark:border-slate-800 rounded-xl p-4 flex gap-4 items-start relative overflow-hidden transition-transform hover:-translate-y-0.5 duration-200 cursor-pointer shadow-sm hover:shadow-md ${!notification.unread ? 'opacity-70 hover:opacity-100' : ''}`}
                >
                  {/* Unread Indicator */}
                  {notification.unread && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary dark:bg-primary-fixed"></div>
                  )}
                  
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${notification.bgColor}`}>
                    <span className={`material-symbols-outlined ${notification.iconColor}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                      {notification.icon}
                    </span>
                  </div>
                  
                  <div className="flex-grow pt-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className={`font-[Inter] text-[16px] ${notification.unread ? 'font-semibold' : 'font-medium'} text-on-surface dark:text-white`}>
                        {notification.type}
                      </h4>
                      <span className="font-[Inter] text-[14px] text-outline dark:text-slate-500 whitespace-nowrap ml-4">
                        {notification.time}
                      </span>
                    </div>
                    <p className="font-[Inter] text-[16px] text-on-surface-variant dark:text-slate-300 line-clamp-1">
                      {notification.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Notification Group: Yesterday */}
        {yesterdayNotifications.length > 0 && (
          <section className="mb-10">
            <h3 className="font-[Inter] text-[14px] font-medium text-outline dark:text-slate-500 tracking-widest uppercase mb-4 ml-2">Yesterday</h3>
            <div className="space-y-3">
              {yesterdayNotifications.map(notification => (
                <div 
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={`bg-surface-container-lowest dark:bg-[#070e12] border border-surface-variant dark:border-slate-800 rounded-xl p-4 flex gap-4 items-start relative overflow-hidden transition-transform hover:-translate-y-0.5 duration-200 cursor-pointer shadow-sm hover:shadow-md ${!notification.unread ? 'opacity-70 hover:opacity-100' : ''}`}
                >
                  {/* Unread Indicator */}
                  {notification.unread && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary dark:bg-primary-fixed"></div>
                  )}
                  
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${notification.bgColor}`}>
                    <span className={`material-symbols-outlined ${notification.iconColor}`} style={{ fontVariationSettings: "'FILL' 0" }}>
                      {notification.icon}
                    </span>
                  </div>
                  
                  <div className="flex-grow pt-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className={`font-[Inter] text-[16px] ${notification.unread ? 'font-semibold' : 'font-medium'} text-on-surface dark:text-white`}>
                        {notification.type}
                      </h4>
                      <span className="font-[Inter] text-[14px] text-outline dark:text-slate-500 whitespace-nowrap ml-4">
                        {notification.time}
                      </span>
                    </div>
                    <p className="font-[Inter] text-[16px] text-on-surface-variant dark:text-slate-300 line-clamp-1">
                      {notification.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
