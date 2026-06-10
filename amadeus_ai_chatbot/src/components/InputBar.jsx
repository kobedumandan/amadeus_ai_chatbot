import '../styles/InputBar.css';

export default function InputBar() {
    return (
        <div className='searchbar_wrapper'>
            <input className='search_input' type="text" size={70} placeholder='Ask me Anything!'/>
        </div>
    );
}