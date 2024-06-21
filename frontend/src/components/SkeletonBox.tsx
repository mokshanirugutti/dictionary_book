import React from 'react'
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';


const SkeletonBox : React.FC = () => {
  return (
    <div className='w-1/4  mt-10 mx-auto'>
    <Box sx={{ width: 400 }}>
      <Skeleton sx={{height:40}}/>
      <Skeleton animation="pulse"  />
      <Skeleton animation={false} />
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>
    </div>
  )
}

export default SkeletonBox