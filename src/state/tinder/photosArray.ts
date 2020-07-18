import { DogPhoto } from './types';
import { element } from 'prop-types';
import programmer from './reducer';
import axios from "axios";


export const getPhotosList = async () => {
  const {data} = await axios.get("https://dog.ceo/api/breeds/image/random/50");
  if(data && data.status=="success"){
     return data.message;
  }
  else{
      return [];
  }
};

// export const filterProgrammerArray = (name: string) => {
//   const filteredProgrammerArray: Programmer[] = programmers.filter(
//     (element: Programmer) => element.name === name,
//   );
//   return filteredProgrammerArray;
// };

