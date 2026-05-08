import { heroApi } from '../api/hero.api';


export const getHeroesByPage = async() => {
  const { data }= await heroApi.get(`/heroes`);
  console.log(data);
}