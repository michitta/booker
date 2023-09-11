import styles from "../styles/components/Layout.module.scss";
import { FC } from "react";
import { selectFinder } from "../features/finder/finder.slice.ts";
import { useAppSelector } from "../redux.ts";
import { AnimatePresence, motion } from "framer-motion";

const Layout: FC<{ close(): void; isVisible: boolean }> = ({
  isVisible,
  close,
}) => {
  // Redux moment
  const { selectedBook } = useAppSelector(selectFinder);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles.layout}
        >
          {selectedBook && (
            <div>
              <div className={styles.header}>
                <p>Информация о книге</p>
                <button className={styles.button} onClick={() => close()}>
                  <svg
                    width="8"
                    height="8"
                    viewBox="0 0 8 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.149123 0.850875L7.1491 7.8509C7.23685 7.94735 7.35965 8 7.5 8C7.77195 8 8 7.77195 8 7.5C8 7.35965 7.94735 7.23685 7.8509 7.1491L0.850875 0.149122C0.76316 0.0526315 0.64035 0 0.5 0C0.22807 0 0 0.22807 0 0.499999C0 0.64035 0.0526315 0.76316 0.149123 0.850875ZM7.1491 0.149122L0.149123 7.1491C0.0526315 7.23685 0 7.35965 0 7.5C0 7.77195 0.22807 8 0.5 8C0.64035 8 0.76316 7.94735 0.850875 7.8509L7.8509 0.850875C7.94735 0.76316 8 0.64035 8 0.499999C8 0.22807 7.77195 0 7.5 0C7.35965 0 7.23685 0.0526315 7.1491 0.149122Z"
                      fill="#EBEBF5"
                      fillOpacity="0.3"
                    />
                  </svg>
                </button>
              </div>
              <div className={styles.info}>
                <section>
                  {selectedBook.volumeInfo?.imageLinks?.thumbnail ? (
                    <img
                      alt={"image_id" + selectedBook.id}
                      src={selectedBook.volumeInfo?.imageLinks?.thumbnail}
                    />
                  ) : (
                    <p>Нет изображения</p>
                  )}
                </section>
                <section>
                  <p>{selectedBook.volumeInfo?.categories}</p>
                  <p>{selectedBook.volumeInfo?.authors?.join(", ")}</p>
                  <p>{selectedBook.volumeInfo?.title}</p>
                  <p>{selectedBook.volumeInfo?.description?.slice(0, 1500)}</p>
                </section>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Layout;
