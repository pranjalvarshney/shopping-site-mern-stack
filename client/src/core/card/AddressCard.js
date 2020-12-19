import React from "react"

export const AddressCard = ({ addresses }) => {
  return (
    <div>
      <h5>Delivery address</h5>
      <form>
        <div className='row'>
          <div className='form-group col-6'>
            <label className='text-muted'>Name</label>
            <input className='form-control form-control-sm' />
          </div>
          <div className='form-group col-6'>
            <label className='text-muted'>Contact No</label>
            <input className='form-control form-control-sm' />
          </div>
        </div>
        <div className='form-group'>
          <label className='text-muted'>Address</label>
          <textarea className='form-control form-control-sm' />
        </div>
        <div className='row'>
          <div className='form-group col-6'>
            <label className='text-muted'>Area Code</label>
            <input className='form-control form-control-sm' />
          </div>
          <div className='form-group col-6'>
            <label className='text-muted'>Country</label>
            <select className='form-control form-control-sm'>
              <option>India</option>
              <option>America</option>
              <option>Australia</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  )
}
