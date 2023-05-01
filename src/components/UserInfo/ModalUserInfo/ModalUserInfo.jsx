import { useEffect } from 'react';
import styles from './ModalUserInfo.module.css';
import { NavLink } from 'react-router-dom/dist';
import { ReactComponent as IconUser } from '../../../icons/icon-user.svg';
import { ReactComponent as IconLogout } from '../../../icons/icon-logout.svg';
// import LogoutBtn from '../../LogoutBtn/LogoutBtn';

export const ModalUserInfo = ({ toggleModal, profile }) => {
  useEffect(() => {
    const coseModal = evt => {
      if (evt instanceof KeyboardEvent && evt.code === 'Escape') {
        toggleModal();
      }
    };
    window.addEventListener('keydown', coseModal);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', coseModal);
      document.body.style.overflow = '';
    };
  }, [toggleModal]);

  const closeOnClick = evt => {
    if (evt.target === evt.currentTarget) {
      toggleModal();
    }
  };

  const name = profile.split(' ')[0];
  const firstLetter = name[0].toLocaleUpperCase();

  return (
    <div className={styles.overlay} onClick={closeOnClick}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.avatar}>{firstLetter}</div>
          <p className={styles.text}>{name}</p>
        </div>
        <div className={styles.stylelink}>
          <NavLink className={styles.link} to="/account">
            <IconUser className={styles.icon} />
            My Account
          </NavLink>
        </div>
        <button className={styles.lgButton} type="button">
          Log out
          <IconLogout className={styles.lgButton_icon} />
        </button>
        {/* <LogoutBtn className={styles.lgButton} /> */}
        
      </div>
    </div>
  );
};
