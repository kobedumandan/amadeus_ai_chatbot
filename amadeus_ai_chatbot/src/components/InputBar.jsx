import '../styles/InputBar.css';
import { SendInput } from '../assets/svg/svg.jsx';

export default function InputBar() {
    return (
        <div className='searchbar_wrapper'>
            <input className='search_input' type="text" size={70} placeholder='Ask me Anything!'/>
            <button className='input-bar-btn'>
                <SendInput className="input_btn"/>
            </button>
        </div>
    );
}