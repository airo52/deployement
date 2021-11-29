import './style.css';
const Home =()=>{

    

   return <>
           
        <a href="#" class="scrolltop" id="scroll-top">
            <i class='bx bx-up-arrow-alt scrolltop__icon'></i>
        </a>
       

        <header class="l-header" id="header">
            <nav class="nav bd-container">
                <a href="#" class="nav__logo">PeakWriters</a>

                <div class="nav__menu show-menu" id="nav-menu">
                    <ul class="nav__list">
                        <li class="nav__item"><a href="/#/" class="nav__link active-link">Home</a></li>
                        <li class="nav__item"><a href="/#/" class="nav__link">#</a></li>
                        <li class="nav__item"><a href="/#/Terms" class="nav__link">terms & conditions</a></li>
                        <li class="nav__item"><a href="#Login" class="button nav__link">Login</a></li>

                        <li><i class='bx bx-toggle-left change-theme' id="theme-button"></i></li>
                    </ul>
                </div>

                <div class="nav__toggle" id="nav-toggle">
                    <i class='bx bx-grid-alt'></i>
                </div>
            </nav>
        </header>

        <main class="l-main">
         


            <section class="share section bd-container" id="share">
                <div class="share__container bd-grid">
                    <div class="share__data">
                        <h2 class="section-title-center">PeakWriters <br/> Abouts Us</h2>
                        <p class="share__description"><small>We believe ideas come from everyone, everywhere. At Kate Consultancy, everyone within our agency walls is a writer in their own right. And there are a few principles we believe—and we believe everyone should believe—about our writings. These truths drive us, motivate us, and ultimately help us redefine the power of words..</small></p>
                        <a href="https://wa.me/254708405852" target="_blank" class="button"> Contact (±254708405852)</a>
                    </div>

                    <div class="share__img">
                        <img src="https://media.istockphoto.com/photos/female-translator-working-on-a-document-picture-id1280363533?b=1&k=20&m=1280363533&s=170667a&w=0&h=W7CaYTeouaiCoACwrUhH8GmMErOZWNWYDxzoaB1WgTY=" alt=""/>
                    </div>
                </div>
            </section>

           
            <section class="decoration section bd-container" id="decoration">
                <h2 class="section-title">Services <br/> @Writers</h2>
                <div class="decoration__container bd-grid">
                    <div class="decoration__data">
                        <img src={require('./img/decoration1.png').default} alt="" class="decoration__img"/>
                        <h3 class="decoration__title">Writing</h3>
                        <a href="#" class="button button-link"><small>
                    
                            Writing is our core business. We strive to get the best quality writers for you. Isn't is just better to leave it to Professionals?
                            </small></a>
                    </div>

                    <div class="decoration__data">
                        <img src={require('./img/decoration2.png').default} alt="" class="decoration__img"/>
                        <h3 class="decoration__title">SUPPORT</h3>


                    <a href="#" class="button button-link"><small>We provide support to both our writers and customers. Advice and feedback are critical in our system. Kindly support us as we support you.</small>
    </a>
                    </div>

                    <div class="decoration__data">
                        <img src={require('./img/decoration3.png').default} alt="" class="decoration__img"/>
                        <h3 class="decoration__title">Passion</h3>
                        <a href="#" class="button button-link"><small>
                       
We love what we do and strive to provide the best quality material. You should also be passionate before joining.
                            </small></a>
                    </div>
                </div>
            </section>

          

          
        </main>

        
        <footer class="footer section">
            <div class="footer__container bd-container bd-grid">
                <div class="footer__content">
                    <h3 class="footer__title">
                        <a href="#" class="footer__logo">PeakWriters</a>
                    </h3>
                    <p class="footer__description"><small>We believe ideas come from everyone, everywhere. At Kate Consultancy, everyone within our agency walls is a writer in their own right. And there are a few principles we believe—and we believe everyone should believe—about our writings. These truths drive us, motivate us, and ultimately help us redefine the power of words.</small></p>
                </div>

                <div class="footer__content">
                    <h3 class="footer__title">Our Services</h3>
                    <small>
                    <ul>
                        <li><a href="#" class="footer__link">Writing And research work </a></li>
                        <li><a href="#" class="footer__link">Coding/Programming </a></li>
                        <li><a href="#" class="footer__link">Design </a></li>
                        <li><a href="#" class="footer__link">Online classes </a></li>
                        <li><a href="#" class="footer__link">Live tutoring </a></li>
                       
                    </ul>
                    </small>
                </div>

                <div class="footer__content">
                    <h3 class="footer__title">Our Company</h3>
                    <ul>
                        <li><a href="#" class="footer__link">PeakWriters</a></li>
                       
                    </ul>
                </div>

                <div class="footer__content">
                    <h3 class="footer__title">Social</h3>
                    <a href="#" class="footer__social"><i class='bx bxl-facebook-circle '></i></a>
                    <a href="#" class="footer__social"><i class='bx bxl-twitter'></i></a>
                    <a href="#" class="footer__social"><i class='bx bxl-instagram-alt'></i></a>
                </div>
            </div>

            <p class="footer__copy">&#169; 2021 PeakWriters. All right reserved</p>
        </footer>
    </>
}

export default Home;