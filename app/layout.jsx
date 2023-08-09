import '@styles/globals.css';
import Nav from '@components/Nav/Nav';
import Provider from '@components/Provider/Provider';

export const metadata = {
  title: 'Promptbook',
  description: 'Discover and Share AI Prompts',
};

const RootLayout = ({ children }) => {
  return (
    <html>
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
