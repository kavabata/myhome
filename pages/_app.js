import css from './style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../components/footer';

export default function App({ Component, pageProps }) {
  return (
  <div className={css.main}>
    <Component {...pageProps} />
    <Footer />
  </div>
  );
}