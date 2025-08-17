import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
// import useDispotch
export const useAppDispatch = () => useDispatch<AppDispatch>();
