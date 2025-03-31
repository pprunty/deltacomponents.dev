import { Header } from '@/app/header';
import Footer from '@/app/footer';
import Sidebar from './sidebar';
import '../globals.css';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col md:ml-16">
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
