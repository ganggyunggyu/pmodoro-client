import { Link } from 'react-router';

import { motion } from 'framer-motion';

export const Footer = () => {
  return (
    <motion.footer
      initial={{ translateY: 30, opacity: 0 }}
      animate={{ translateY: 0, opacity: 1 }}
      exit={{ translateY: -30, opacity: 0, position: 'fixed' }}
      transition={{ duration: 0.5 }}
      className="absolute bottom-0 w-screen h-20 px-[10%] flex justify-between bg-primary-mute text-white text-xs"
    >
      <article className="flex items-center gap-3">
        <Link
          to={
            'https://tidal-oval-d41.notion.site/1bdf990b675180859bade3a99096c1fd?pvs=4'
          }
        >
          개인정보 처리방침
        </Link>
        <div className="h-3 w-[1px] bg-white" />
        <Link
          to={
            'https://tidal-oval-d41.notion.site/1bdf990b6751808089e3cd50b9f78af4?pvs=4'
          }
        >
          이용 약관
        </Link>
      </article>

      <article className="flex items-center justify-center">
        <button>문제 신고</button>
      </article>
    </motion.footer>
  );
};
