import Wrapper from '../section/Wrapper'
import { FaFacebook, FaGithub } from 'react-icons/fa'

function About() {
  return (
    <div className='profile'>
      <img src="https://scontent.fmnl17-1.fna.fbcdn.net/v/t1.6435-9/103671434_703485763774942_1198969297983765738_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=53a332&_nc_eui2=AeEGNwfMaYPfv1V_GjSC4GkUmf_Ud1lFePaZ_9R3WUV49sJgVOTHsuhCokbC3fzlbylQcpjIomBs29Hw14k1cbSa&_nc_ohc=LqbemnK2PuQQ7kNvgHAY6L0&_nc_ht=scontent.fmnl17-1.fna&oh=00_AYAmh-6hCdm42wbVjGxK8aWL2iSWrtcTcxFfZ7KDGOFGIw&oe=66E172A8"
        alt="" className='profile-image' />
      <h1 className="profile-text">Hi I am Owen BOI!</h1>
      <h2 className='profile-text'>This is my sideproject pokedex have fun browsing some pokemons</h2>
      <div className='profile-links'>
        <a href="https://github.com/SANTEOWEN">
          <FaGithub />
        </a>
        <a href="https://www.facebook.com/sante.owen/">
          <FaFacebook />
        </a>
      </div>
    </div>
  )
}

export default Wrapper(About)