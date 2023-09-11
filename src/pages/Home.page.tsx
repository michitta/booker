import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../redux";
import { selectBook, selectFinder } from "../features/finder/finder.slice";
import styles from "../styles/Home.module.scss";
import { addByContext, getByContext } from "../features/finder/finder.thunk.ts";
import Layout from "../components/Layout.component.tsx";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function HomePage() {
  // Redux moment
  const { isLoading, books } = useAppSelector(selectFinder);
  const dispatch = useAppDispatch();

  // React states
  const [req, setReq] = useState<{
    payload: string;
    category: string;
    sortBy: string;
    counter: number;
  } | null>(null);

  // Layout manager
  const [layoutIsVisible, setLayoutIsVisible] = useState(false);

  // React_hook_forms
  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm();

  // Этот код нужен для моментального поиска по введённым данным из input (если он был нужен)
  // const cont = watch('context')
  //
  // useEffect(() => {
  //     dispatch(getByContext({ payload: cont, category: 'all', sortBy: 'relevance' }))
  // }, [cont])

  const onSubmit = async (data: any) => {
    // Записываем текущий запрос в state, чтобы при "load more" могли вернуть ответ
    setReq({
      payload: data.context,
      category: data.category,
      sortBy: data.sort,
      counter: 1,
    });

    // Запрашиваем данные с Google API
    dispatch(
      getByContext({
        payload: data.context,
        category: data.category,
        sortBy: data.sort,
      }),
    );
  };

  return (
    <>
      <Layout
        close={() => setLayoutIsVisible(false)}
        isVisible={layoutIsVisible}
      />
      <div className={styles.main}>
        <section>
          <div>
            <h1>Поиск книг</h1>
            <p>Введи название книги, серию, автора, жанр, издательство</p>
            {books && (
              <p>
                {isLoading
                  ? "Выполняется поиск книг"
                  : `Найдено ${books.totalItems} результатов`}
              </p>
            )}
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className="flex gap-[10px]">
              <select className={styles.select} {...register("category")}>
                <option value="all">all</option>
                <option value="art">art</option>
                <option value="biography">biography</option>
                <option value="computers">computers</option>
                <option value="history">history</option>
                <option value="medical">medical</option>
                <option value="poetry">poetry</option>
              </select>
              <select className={styles.select} {...register("sort")}>
                <option value="relevance">relevance</option>
                <option value="newest">newest</option>
              </select>
            </div>
            <input
              type="text"
              className={styles.input}
              placeholder="Поиск"
              autoComplete={"no"}
              {...register("context", {
                required: true,
              })}
            />
            <button className={styles.button}>
              {isLoading ? (
                <span className={styles.spinner}></span>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_27_11)">
                    <path
                      d="M6.2857 11.8857C9.37849 11.8857 11.8857 9.37852 11.8857 6.28573C11.8857 3.19294 9.37849 0.68573 6.2857 0.68573C3.1929 0.68573 0.685699 3.19294 0.685699 6.28573C0.685699 9.37852 3.1929 11.8857 6.2857 11.8857Z"
                      stroke="white"
                      strokeWidth="1.2"
                    />
                    <path
                      d="M10.8571 10.8571L15.0804 15.0431"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_27_11">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              )}
            </button>
          </form>
        </section>
        <AnimatePresence>
          {books && !layoutIsVisible && (
            <section>
              {books.items?.map((book) => {
                if (
                  !book.volumeInfo?.categories ||
                  !book.volumeInfo?.authors ||
                  !book.volumeInfo?.description
                )
                  return;
                return (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring" }}
                    className={styles.book}
                    key={book.etag}
                    style={{
                      backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, #000 100%), url("${book.volumeInfo?.imageLinks?.thumbnail}")`,
                      backgroundSize: "cover",
                      backgroundClip: "padding-box",
                      backgroundRepeat: "no-repeat",
                    }}
                    onClick={() => {
                      dispatch(
                        selectBook({
                          id: book.id,
                          volumeInfo: book.volumeInfo,
                        }),
                      );
                      setLayoutIsVisible(true);
                    }}
                  >
                    <span>
                      <p>{book.volumeInfo?.categories}</p>
                      <p>{book.volumeInfo?.title}</p>
                    </span>
                    <p>{book.volumeInfo?.authors?.join(", ")}</p>
                  </motion.div>
                );
              })}
              {req && (
                <button
                  className={styles.button}
                  onClick={() => {
                    dispatch(
                      addByContext({
                        payload: req.payload,
                        category: req.category,
                        sortBy: req.sortBy,
                        counter: req.counter + 1,
                      }),
                    );
                    setReq({ ...req, counter: req?.counter + 1 });
                  }}
                >
                  {isLoading ? (
                    <span className={styles.spinner}></span>
                  ) : (
                    "Загрузить ещё"
                  )}
                </button>
              )}
            </section>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default HomePage;
