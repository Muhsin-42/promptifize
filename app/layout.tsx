import '@styles/globals.css'
import Nav from '@components/Nav'
import Provider from '@components/Provider'

interface RootLayoutProps  {
    children: React.ReactNode;
}

export const metaData = {
    title: 'Promptifize',
    description: 'Discover and share AI Prompts'
}

const RootLayout = ({children}: RootLayoutProps) =>{
    return (
            <html lang='en'>
            <body>
                <Provider>
                    <div className="main">
                        <div className="gradient"/>
                    </div>
                    
                    <main className='app'>
                        <Nav/>
                        {children}
                    </main>
                </Provider>
            </body>
            </html>
        )
}

export default RootLayout;