import React from "react"
import Navbar from "./Navbar"

export const Base = ({ className, children }) => {
  return (
    <div>
      <Navbar />
      <div className={className}>{children}</div>
      <div className='mt-5 pt-5 pb-5 footer bg-dark text-white'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-5 col-xs-12 about-company'>
              <h2 id='brandName'>Wrap & go</h2>
              <p className='pt-3 pr-5 text-white-50'>
              We provide an exhaustive collection of exclusive gifts to help you express your deepest feelings for your loved ones. In today’s increasingly hurried times, we get so engrossed in making a living that we almost forget to appreciate the real blessings in our lives - our people. Now is the time to let them know how you feel, without saying a word, through a range of exciting online gift ideas put together by our team of experts. 
              </p>
              <p>
                <a href='/'>
                  <i className='fa fa-facebook-square mr-1'></i>
                </a>
                <a href='/'>
                  <i className='fa fa-linkedin-square'></i>
                </a>
              </p>
            </div>
            <div className='col-lg-3 col-xs-12 links'>
              <ul className='m-0 p-0' style={{listStyle:"none"}}>
                <li className="my-3">
                  <a href='/' className="text-white">Home</a>
                </li>
                <li className="my-3">
                  <a href='/blogs' className="text-white">Blogs</a>
                </li>
                <li className="my-3">
                  <a href='/occassions' className="text-white">Occasions</a>
                </li>
                <li className="my-3">
                  <a href='/cart' className="text-white">Cart</a>
                </li>
               
              </ul>
            </div>
            <div className='col-lg-4 col-xs-12 location'>
              <h4 className='mt-lg-0 mt-sm-4'>Location</h4>
              <p>lorem ipsem address overhere</p>
              <p className='mb-0'>
                <i className='fa fa-phone mr-3'></i>+1 00000 999 99
              </p>
              <p>
                <i className='fa fa-envelope-o mr-3'></i>cs@wrapandgo.com
              </p>
            </div>
          </div>
          <div className='row mt-5'>
            <div className='col copyright'>
              <p className=''>
                <small className='text-white-50'>
                  © 2020. All Rights Reserved.
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
