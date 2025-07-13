// app/layout.jsx

export const metadata = {
  title: 'Trello Todo Board',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
