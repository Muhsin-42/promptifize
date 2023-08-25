"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import { ProviderType } from '@node_modules/next-auth/providers'
function Nav() {
  const isUserLoggedIn = true;
  const [providers,setProviders] = useState<ProviderType[] | null>(null);
  const [toggleDropDown,setToggleDropDown] = useState(false);
  
  const fetchProviders = async () =>{
    try {
      const response = await getProviders();
      setProviders(response);
    } catch (error) {
      console.log('error occured ',error);
    }
  }

  useEffect(()=>{
    fetchProviders();   
  },[]);

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href="/" className='flex gap-2 flex-center'>
        <Image  src="/assets/images/logo.svg" width={30} height={30} alt='logo'/>
        <p className='logo_text'>Promptifize</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {
          isUserLoggedIn? 
            <div className='flex gap-3 md:gap-5'>
              <Link href="/create-prompt"
                className='black_btn'
              >
                Create Post
              </Link>

              <button type='button' className="outline_btn" 
                      onClick={signOut}
              > Sign Out
              </button>

              <Link href={'/profile'}>
                <Image src="/assets/images/logo.svg"
                        width={37}
                        height={37}
                        alt='profile'
                        className='rounded-full'
                />
              </Link>
            </div>
          :
            <>
            {
              providers &&
              Object.values(providers).map((provider)=>(
                <button type="button" 
                key={provider?.name}
                className="black_btn"
                onClick={() => signIn(provider?.id)} 
                >
                  Sign In
                </button>
              ))
            }
            </>
        }
      </div>

      {/* Mobile Navigation */}
        <div className="sm:hidden flex relative">
          {
            isUserLoggedIn ?
              <>
                <div className="flex">
                  <Image src="/assets/images/logo.svg"
                          width={37}
                          height={37}
                          alt='profile'
                          className='rounded-full'
                          onClick={() => setToggleDropDown(prev=>!prev)}
                  />
                </div>
                {
                  toggleDropDown && (
                    <div className="dropdown">
                      <Link 
                        href={'/profile'} 
                        className='dropdown_link'
                        onCanPlay={() => setToggleDropDown(false)}
                        >
                          My Profile
                      </Link>
                      <Link 
                        href={'/profile'} 
                        className='dropdown_link'
                        onCanPlay={() => setToggleDropDown(false)}
                        >
                          Create Prompt
                      </Link>
                      <button type='button'
                        onClick={()=>{
                          setToggleDropDown(false);
                          signOut();
                        }}
                        className='mt-5 w-full black_btn'
                      >
                        Sign Out
                      </button>
                    </div>
                  )
                }
            </>
            :
            <>
            {
              providers && 
              Object.values(providers).map((provider)=>(
                <button type="button" 
                key={provider?.name}
                className="black_btn"
                onClick={() => signIn(provider?.id)} 
                >
                  Sign In
                </button>
              ))
            }
            </>

          }
        </div>

    </nav>

  )
}

export default Nav