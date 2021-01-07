import { Box, Stack } from '@chakra-ui/react'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'

export const StarRating = ({ starcount }) => {
  const stars = parseFloat(starcount)

  const full_stars = Math.floor(stars)
  const has_half_star = (stars - full_stars) >= 0.5;
  const empty_stars = 10 - (full_stars + (has_half_star ? 1 : 0));
  return (
    <Stack direction="row">
      {[...new Array(full_stars)].map((_, index) => <BsStarFill color="#C69320" key={index} />)}
      { has_half_star ? <BsStarHalf color="#C69320" /> : null}
      {[...new Array(empty_stars)].map((_, index) => <BsStar color="#C69320" key={10 + index} />)}
    </Stack >
  )
}