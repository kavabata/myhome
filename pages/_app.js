import './style.css';
import Footer from '../components/footer';

export default function App({ Component, pageProps }) {
  return (
  <div>
    <Component {...pageProps} />
    <Footer />
  </div>
  );
}