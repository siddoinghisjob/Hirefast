import React from 'react'

export default function ProfileBox({attribute, value, isDisabled}) {
  return (
    <div className="w-full flex justify-center gap-5 items-center flex-col md:flex-row">
    <label className="w-full md:w-fit capitalize flex md:items-start" for={`"${attribute}"`}>
      {attribute}
    </label>
    <input
      value={value}
      className={`w-full min-h-fit p-4 py-2 rounded-lg ${isDisabled ? 'bg-slate-100':''} border-2 border-slate-600 placeholder:text-black ${isDisabled ? 'cursor-not-allowed' : ''}`}
      id="name"
      disabled={isDisabled}
    />
  </div>
  )
}
