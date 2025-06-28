import React from 'react'

const BG = () => {
  return (
    <div className="fixed top-0 left-0 -z-10 h-full w-full overflow-hidden bg-container-background">
      <div className="fixed bottom-auto left-auto right-0 xs:-right-[30%] top-0 h-[300px] w-[300px] rounded-full bg-[#0F71F2] opacity-40 blur-[200px]"></div>
      <div className="fixed left-72 xs:-left-[50%] -bottom-[10%] h-[250px] w-[250px] rounded-full bg-[#0FF2EA] opacity-80 blur-[200px]"></div>
    </div>
  )
}

export default BG
