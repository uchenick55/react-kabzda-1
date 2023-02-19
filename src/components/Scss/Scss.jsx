import "./scss/style.scss"

function App() {
    return (
        <div>
            <h1>Пример работы с scss</h1>
            <div id='grid' >
                <div>111</div>
                <div>222</div>
                <div>333</div>
                <div>444</div>
                <div>555</div>
                <div>666</div>
                <div>777</div>
                <div>888</div>

            </div>
            <div className='block first'>123</div>
            <div className='block' id="central_block">
                <ul>
                    <li>Элемент - 1 <a href="https://ya.ru/">внутри тега li </a></li>
                    <li>Элемент - 2</li>
                    <li>Элемент - 3</li>
                    <li id="liNumber4">Элемент - 4</li>
                    <li id="liNumberFive">Элемент - 5</li>
                </ul>
                <a href="https://ya.ru/">снаружи тега li </a>
            </div>
            <a id="prostoEsheOdnaSsilka" href="https://ya.ru/">prostoEsheOdnaSsilka</a>

        </div>
    );
}

export default App;
