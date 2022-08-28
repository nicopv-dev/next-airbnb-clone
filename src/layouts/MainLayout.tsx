import HeadComponent from '../components/HeadComponent';
import Footer from '../components/Navigation/Footer';
import Header from '../components/Navigation/Header';

interface IMainLayoutProps {
  children: JSX.Element;
  title: string;
}

export default function MainLayout({ children, title }: IMainLayoutProps) {
  return (
    <>
      <HeadComponent title={title} />
      <div className="relative">
        {/* HEADER */}
        <Header />
        {/* CONTENT */}
        <div>{children}</div>
        {/* FOOTER */}
        <Footer />
      </div>
    </>
  );
}
