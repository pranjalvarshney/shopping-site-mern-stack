import React from "react"

export const ImageLoading = ({ imgUrl, height, width }) => {
  if (!imgUrl) {
    return (
      <div className='mx-auto my-5 py-3'>
        <div className='spinner-grow text-danger' role='status'>
          <span className='sr-only'>Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <img
      className='card-img-top'
      src={imgUrl}
      height={height}
      width={width}
      alt='cap'
      style={{objectPosition:"center",objectFit:"cover"}}
    />
  )
}
