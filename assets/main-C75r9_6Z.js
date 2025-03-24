class y{constructor(){this.loader=document.querySelector(".loader"),this.loaderNumber=document.querySelector(".loader-number"),this.loaderText=document.querySelector(".loader-text"),this.images=document.querySelectorAll(".loader-visual-img"),this.currentImage=0,this.progress=0,this.isLoading=!0,this.loadingSpeed=25,!localStorage.getItem("hasVisitedEver")&&this.loader?(this.init(),localStorage.setItem("hasVisitedEver","true")):this.loader&&(this.loader.style.display="none",document.body.style.overflow="auto",setTimeout(()=>{this.animateElements()},100))}init(){this.loaderText&&this.loaderNumber&&(this.loaderText.style.position="absolute",this.loaderText.style.top="2rem",this.loaderText.style.left="2rem",this.loaderNumber.style.position="absolute",this.loaderNumber.style.top="2rem",this.loaderNumber.style.right="2rem"),this.images&&this.images.length>0?this.images[0].classList.add("active"):console.warn("No loader images found"),this.startLoading(),this.preloadImages()}preloadImages(){if(!this.images||this.images.length===0)return;Array.from(this.images).map(e=>e.src).forEach(e=>{if(e){const o=new Image;o.src=e,o.onerror=()=>{console.warn(`Failed to preload image: ${e}`)}}})}startLoading(){const t=setInterval(()=>{this.progress>=100?(clearInterval(t),setTimeout(()=>{this.hideLoader()},500)):(this.progress++,this.loaderNumber&&(this.loaderNumber.textContent=this.progress),this.images&&this.images.length>1&&(this.progress===25?this.changeImage():this.progress===50?this.changeImage():this.progress===75&&this.changeImage()))},this.loadingSpeed)}changeImage(){!this.images||this.images.length===0||(this.currentImage>=0&&this.currentImage<this.images.length&&this.images[this.currentImage].classList.remove("active"),this.currentImage=(this.currentImage+1)%this.images.length,this.images[this.currentImage].classList.add("active"))}hideLoader(){this.loader&&(this.loader.classList.add("hidden"),setTimeout(()=>{this.loader.style.display="none",document.body.style.overflow="auto",this.animateElements()},600))}animateElements(){const t=document.querySelectorAll(".animate-on-load");t&&t.length>0&&t.forEach((e,o)=>{setTimeout(()=>{e.classList.add("animate")},100*o)})}}document.addEventListener("DOMContentLoaded",()=>{new y});class E{constructor(){this.menuButton=document.querySelector("[data-menu-toggle]"),this.menuOverlay=document.querySelector(".menu-overlay"),this.closeButton=document.querySelector(".close-button"),this.menuLinks=document.querySelectorAll(".menu-link:not(.get-quote-button)"),this.quoteButton=document.querySelector(".get-quote-button"),this.body=document.body,this.isMenuOpen=!1,document.body.classList.add("page-loaded");const t=document.querySelector(".loader");t&&(t.classList.add("hidden"),t.style.display="none"),this.menuOverlay&&this.menuOverlay.classList.add("dark-background"),this.menuButton&&this.menuOverlay?this.init():console.warn("Menu elements not found")}init(){this.menuButton&&this.menuButton.addEventListener("click",t=>{t.preventDefault(),this.toggleMenu()}),this.closeButton&&this.closeButton.addEventListener("click",t=>{t.preventDefault(),this.closeMenu()}),this.menuLinks&&this.menuLinks.length>0&&this.menuLinks.forEach(t=>{t.addEventListener("click",e=>{this.closeMenu()})}),document.addEventListener("keydown",t=>{t.key==="Escape"&&this.isMenuOpen&&this.closeMenu()})}toggleMenu(){this.isMenuOpen?this.closeMenu():this.openMenu()}openMenu(){this.menuOverlay&&(this.menuOverlay.classList.add("active"),this.body.style.overflow="hidden",this.isMenuOpen=!0,this.animateMenuItems(!0))}closeMenu(){this.menuOverlay&&(this.animateMenuItems(!1),setTimeout(()=>{this.menuOverlay.classList.remove("active"),this.body.style.overflow="",this.isMenuOpen=!1},300))}animateMenuItems(t){if(!(!this.menuLinks||this.menuLinks.length===0)){if(!t){this.menuLinks.forEach(e=>{e.style.opacity="0",e.style.transform="translateY(20px)"}),this.quoteButton&&(this.quoteButton.style.opacity="0",this.quoteButton.style.transform="translateY(20px)");return}this.menuLinks.forEach((e,o)=>{setTimeout(()=>{e.style.opacity="1",e.style.transform="translateY(0)"},100*(o+1))}),this.quoteButton&&setTimeout(()=>{this.quoteButton.style.opacity="1",this.quoteButton.style.transform="translateY(0)"},100*(this.menuLinks.length+1))}}}document.addEventListener("DOMContentLoaded",()=>{new E,setTimeout(()=>{document.body.classList.contains("page-loaded")||document.body.classList.add("page-loaded");const r=document.querySelector(".loader");r&&(r.classList.add("hidden"),r.style.display="none")},500)});class S{constructor(){this.animatedElements=document.querySelectorAll(".animate-on-scroll"),this.init(),this.setupScrollAnimations()}init(){this.setupPageTransitions(),this.animateElementsInView(),window.addEventListener("scroll",()=>{this.animateElementsInView()}),document.body.classList.add("page-loaded")}setupPageTransitions(){document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"]').forEach(e=>{e.classList.contains("menu-link")||e.addEventListener("click",o=>{if(e.getAttribute("target")!=="_blank"&&!e.getAttribute("href").startsWith("http")&&!e.getAttribute("href").startsWith("#")){const a=e.getAttribute("href"),i=document.createElement("div");i.classList.add("page-transition-overlay"),document.body.appendChild(i),setTimeout(()=>{window.location.href=a},400)}})}),window.addEventListener("load",()=>{setTimeout(()=>{this.animatePageEntrance()},100)}),this.animatePageEntrance()}animatePageEntrance(){const t=document.querySelectorAll(".animate-on-load");t&&t.length>0&&t.forEach((e,o)=>{setTimeout(()=>{e.classList.add("visible")},100+o*100)})}setupScrollAnimations(){this.animatedElements&&this.animatedElements.length>0&&this.animatedElements.forEach(t=>{t.style.opacity="0",t.style.transform="translateY(40px)",t.style.transition="opacity 0.8s ease, transform 0.8s ease"})}animateElementsInView(){this.animatedElements&&this.animatedElements.length>0&&this.animatedElements.forEach(t=>{this.isElementInViewport(t)&&!t.classList.contains("animated")&&(t.classList.add("animated"),t.style.opacity="1",t.style.transform="translateY(0)")})}isElementInViewport(t){const e=t.getBoundingClientRect(),o=window.innerHeight||document.documentElement.clientHeight;return e.top<=o*.8}static setDelay(t,e){t.style.transitionDelay=`${e}ms`}}document.addEventListener("DOMContentLoaded",()=>{new S});class x{constructor(){this.quoteButton=document.getElementById("get-quote-button"),this.quoteModal=document.getElementById("quote-modal"),this.closeButtons=document.querySelectorAll(".quote-close-button"),this.overlay=document.querySelector(".quote-modal-overlay"),this.container=document.querySelector(".quote-modal-container"),this.content=document.querySelector(".quote-content"),this.formData={projectType:"",spaceSize:"",features:[],budget:"",timeline:"",name:"",email:"",phone:"",location:""},this.currentStep=0,this.totalSteps=6,this.backgroundImages={default:"https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1470",residential:"https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&q=80&w=1470",commercial:"https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1469",interior:"https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=1470",hospitality:"https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&q=80&w=1470",sustainability:"https://images.unsplash.com/photo-1518623489648-a173ef7824f3?auto=format&fit=crop&q=80&w=1470",smart:"https://images.unsplash.com/photo-1558002038-1055952a6c91?auto=format&fit=crop&q=80&w=1470",outdoor:"https://images.unsplash.com/photo-1600607687939-ce8a6c349031?auto=format&fit=crop&q=80&w=1470",custom:"https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&q=80&w=1470",lighting:"https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&q=80&w=1470",landscape:"https://images.unsplash.com/photo-1551524164-687a55dd1126?auto=format&fit=crop&q=80&w=1470"},this.quoteButton&&this.quoteModal&&this.init()}init(){this.quoteButton&&this.quoteButton.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),this.openModal()}),budquoteCss=document.createElement("style"),quoteCss.textContent=`
      .quote-modal-container {
        padding-top: 60px;
        padding-bottom: 100px;
      }

      .form-progress-container {
        position: fixed;
        bottom: 60px;
        left: 0;
        width: 100%;
      }

      .form-buttons {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 15px;
        background: white;
        border-top: 1px solid #eee;
        z-index: 100;
      }

      @media (max-width: 428px) {
        .quote-modal-container {
          padding-top: 60px;
          padding-bottom: 120px;
        }
      }
    `,document.head.appendChild(quoteCss),this.closeButtons&&this.closeButtons.length>0&&this.closeButtons.forEach(t=>{t.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),this.closeModal()})}),this.overlay&&this.overlay.addEventListener("click",t=>{t.target===this.overlay&&this.closeModal()}),document.addEventListener("keydown",t=>{t.key==="Escape"&&this.quoteModal&&this.quoteModal.classList.contains("active")&&this.closeModal()}),this.buildForm()}buildForm(){if(this.content){if(!this.content.querySelector(".form-steps")){const t=document.createElement("div");t.className="form-steps",this.content.appendChild(t);const e=document.createElement("div");e.className="form-progress-container";const o=document.createElement("div");o.className="form-progress-bar",o.style.width="0%",e.appendChild(o),this.content.appendChild(e);const a=document.createElement("div");a.className="form-buttons";const i=document.createElement("button");i.className="form-back-button",i.textContent="Back",i.addEventListener("click",n=>{n.preventDefault(),this.previousStep()});const s=document.createElement("button");s.className="form-next-button",s.textContent="Next",s.addEventListener("click",n=>{n.preventDefault(),this.currentStep===this.totalSteps-1?this.processForm():this.nextStep()}),a.appendChild(i),a.appendChild(s),this.content.appendChild(a)}this.formSteps=this.content.querySelector(".form-steps"),this.progressBar=this.content.querySelector(".form-progress-bar"),this.backButton=this.content.querySelector(".form-back-button"),this.nextButton=this.content.querySelector(".form-next-button")}}openModal(){this.quoteModal&&(this.setBackgroundImage("default"),this.currentStep=0,this.quoteModal.classList.add("active"),document.body.style.overflow="hidden",this.renderStep(),this.updateButtons(),this.updateProgressBar())}closeModal(){this.quoteModal&&(this.quoteModal.classList.remove("active"),document.body.style.overflow="",setTimeout(()=>{this.formSteps&&(this.formSteps.innerHTML=""),this.formData={projectType:"",spaceSize:"",features:[],budget:"",timeline:"",name:"",email:"",phone:"",location:""}},500))}setBackgroundImage(t){if(!this.quoteModal)return;const e=this.backgroundImages[t]||this.backgroundImages.default;this.quoteModal.style.backgroundImage=`linear-gradient(rgba(30, 28, 27, 0.6), rgba(30, 28, 27, 0.85)), url(${e})`,this.quoteModal.style.backgroundSize="cover",this.quoteModal.style.backgroundPosition="center"}renderStep(){if(this.formSteps){switch(this.formSteps.innerHTML="",this.currentStep){case 0:this.renderProjectTypeStep();break;case 1:this.renderSpaceSizeStep();break;case 2:this.renderFeaturesStep();break;case 3:this.renderBudgetStep();break;case 4:this.renderTimelineStep();break;case 5:this.renderContactInfoStep();break;default:this.renderThankYouStep()}setTimeout(()=>{const t=this.formSteps.querySelector(".form-step");t&&t.classList.add("visible")},50)}}renderProjectTypeStep(){if(!this.formSteps)return;const t=document.createElement("div");t.className="form-step project-type-step";const e=document.createElement("h2");e.textContent="What type of project are you planning?";const o=document.createElement("div");o.className="option-grid",[{id:"residential",label:"Residential"},{id:"commercial",label:"Commercial"},{id:"interior",label:"Interior Design"},{id:"hospitality",label:"Others (Custom)"}].forEach(i=>{const s=document.createElement("div");s.className=`option ${this.formData.projectType===i.id?"selected":""}`,s.setAttribute("data-value",i.id),s.setAttribute("data-type",i.id);const n=document.createElement("div");n.className="option-label premium-font",n.textContent=i.label,s.appendChild(n),s.addEventListener("mouseenter",()=>{this.setBackgroundImage(i.id)}),s.addEventListener("mouseleave",()=>{this.formData.projectType?this.setBackgroundImage(this.formData.projectType):this.setBackgroundImage("default")}),s.addEventListener("click",()=>{o.querySelectorAll(".option").forEach(d=>d.classList.remove("selected")),s.classList.add("selected"),this.formData.projectType=i.id,this.setBackgroundImage(i.id),this.updateButtons(),setTimeout(()=>{this.nextStep()},500)}),o.appendChild(s)}),t.appendChild(e),t.appendChild(o),this.formSteps.appendChild(t)}renderSpaceSizeStep(){if(!this.formSteps)return;const t=document.createElement("div");t.className="form-step space-size-step";const e=document.createElement("h2");e.textContent="What is the size of your space?";const o=document.createElement("div");o.className="option-list",[{id:"small",label:"Under 500 sq ft",bgId:"residential"},{id:"medium",label:"500-1000 sq ft",bgId:"commercial"},{id:"large",label:"1000-2500 sq ft",bgId:"interior"},{id:"xl",label:"Over 2500 sq ft",bgId:"hospitality"}].forEach(i=>{const s=document.createElement("div");s.className=`option ${this.formData.spaceSize===i.id?"selected":""}`,s.setAttribute("data-value",i.id);const n=document.createElement("div");n.className="option-label premium-font",n.textContent=i.label,s.appendChild(n),s.addEventListener("mouseenter",()=>{this.setBackgroundImage(i.bgId)}),s.addEventListener("mouseleave",()=>{this.formData.projectType?this.setBackgroundImage(this.formData.projectType):this.setBackgroundImage("default")}),s.addEventListener("click",()=>{o.querySelectorAll(".option").forEach(d=>d.classList.remove("selected")),s.classList.add("selected"),this.formData.spaceSize=i.id,this.updateButtons(),setTimeout(()=>{this.nextStep()},500)}),o.appendChild(s)}),t.appendChild(e),t.appendChild(o),this.formSteps.appendChild(t)}renderFeaturesStep(){if(!this.formSteps)return;const t=document.createElement("div");t.className="form-step features-step";const e=document.createElement("h2");e.textContent="Select features you need:";const o=document.createElement("div");o.className="option-grid feature-grid",[{id:"sustainability",label:"Sustainable Design",bgId:"sustainability"},{id:"smart",label:"Smart Home Integration",bgId:"smart"},{id:"outdoor",label:"Outdoor Spaces",bgId:"outdoor"},{id:"custom",label:"Custom Furniture",bgId:"custom"},{id:"lighting",label:"Lighting Design",bgId:"lighting"},{id:"landscape",label:"Landscape Design",bgId:"landscape"}].forEach(s=>{const n=document.createElement("div");n.className=`option ${this.formData.features.includes(s.id)?"selected":""}`,n.setAttribute("data-value",s.id);const d=document.createElement("div");d.className="option-label premium-font",d.textContent=s.label,n.appendChild(d),n.addEventListener("mouseenter",()=>{this.setBackgroundImage(s.bgId)}),n.addEventListener("mouseleave",()=>{this.formData.projectType?this.setBackgroundImage(this.formData.projectType):this.setBackgroundImage("default")}),n.addEventListener("click",()=>{n.classList.toggle("selected"),n.classList.contains("selected")?this.formData.features.includes(s.id)||this.formData.features.push(s.id):this.formData.features=this.formData.features.filter(l=>l!==s.id),this.updateButtons()}),o.appendChild(n)});const i=document.createElement("p");i.className="form-note",i.textContent="Select any that apply. This step is optional.",t.appendChild(e),t.appendChild(o),t.appendChild(i),this.formSteps.appendChild(t)}renderBudgetStep(){if(!this.formSteps)return;const t=document.createElement("div");t.className="form-step budget-step";const e=document.createElement("h2");e.textContent="What is your budget range?";const o=document.createElement("div");o.className="option-list",[{id:"basic",label:"₹5 Lakhs - ₹10 Lakhs"},{id:"standard",label:"₹10 Lakhs - ₹25 Lakhs"},{id:"premium",label:"₹25 Lakhs - ₹50 Lakhs"},{id:"luxury",label:"₹50 Lakhs+"}].forEach(i=>{const s=document.createElement("div");s.className=`option ${this.formData.budget===i.id?"selected":""}`,s.setAttribute("data-value",i.id);const n=document.createElement("div");n.className="option-label premium-font",n.textContent=i.label,s.appendChild(n),s.addEventListener("click",()=>{o.querySelectorAll(".option").forEach(d=>d.classList.remove("selected")),s.classList.add("selected"),this.formData.budget=i.id,this.updateButtons(),setTimeout(()=>{this.nextStep()},500)}),o.appendChild(s)}),t.appendChild(e),t.appendChild(o),this.formSteps.appendChild(t)}renderTimelineStep(){if(!this.formSteps)return;const t=document.createElement("div");t.className="form-step timeline-step";const e=document.createElement("h2");e.textContent="When do you plan to start this project?";const o=document.createElement("div");o.className="option-list",[{id:"urgent",label:"As soon as possible",bgId:"commercial"},{id:"soon",label:"In the next 3 months",bgId:"residential"},{id:"planning",label:"In 3-6 months",bgId:"interior"},{id:"future",label:"In 6+ months",bgId:"hospitality"}].forEach(i=>{const s=document.createElement("div");s.className=`option ${this.formData.timeline===i.id?"selected":""}`,s.setAttribute("data-value",i.id);const n=document.createElement("div");n.className="option-label premium-font",n.textContent=i.label,s.appendChild(n),s.addEventListener("mouseenter",()=>{this.setBackgroundImage(i.bgId)}),s.addEventListener("mouseleave",()=>{this.formData.projectType?this.setBackgroundImage(this.formData.projectType):this.setBackgroundImage("default")}),s.addEventListener("click",()=>{o.querySelectorAll(".option").forEach(d=>d.classList.remove("selected")),s.classList.add("selected"),this.formData.timeline=i.id,this.updateButtons(),setTimeout(()=>{this.nextStep()},500)}),o.appendChild(s)}),t.appendChild(e),t.appendChild(o),this.formSteps.appendChild(t)}renderContactInfoStep(){if(!this.formSteps)return;const t=document.createElement("div");t.className="form-step contact-step";const e=document.createElement("h2");e.textContent="Almost done! Please provide your contact details:";const o=document.createElement("div");o.className="contact-form";const a=document.createElement("div");a.className="form-group";const i=document.createElement("label");i.setAttribute("for","quote-name"),i.textContent="Name";const s=document.createElement("input");s.type="text",s.id="quote-name",s.required=!0,s.value=this.formData.name,s.addEventListener("input",u=>{this.formData.name=u.target.value,this.validateField(s,!!u.target.value.trim()),this.updateButtons()}),a.appendChild(i),a.appendChild(s);const n=document.createElement("div");n.className="form-group";const d=document.createElement("label");d.setAttribute("for","quote-email"),d.textContent="Email";const l=document.createElement("input");l.type="email",l.id="quote-email",l.required=!0,l.value=this.formData.email,l.addEventListener("input",u=>{this.formData.email=u.target.value;const v=this.validateEmail(u.target.value);this.validateField(l,v),this.updateButtons()}),n.appendChild(d),n.appendChild(l);const c=document.createElement("div");c.className="form-group";const f=document.createElement("label");f.setAttribute("for","quote-phone"),f.textContent="Phone";const m=document.createElement("input");m.type="tel",m.id="quote-phone",m.value=this.formData.phone,m.addEventListener("input",u=>{this.formData.phone=u.target.value}),c.appendChild(f),c.appendChild(m);const h=document.createElement("div");h.className="form-group";const g=document.createElement("label");g.setAttribute("for","quote-location"),g.textContent="Location";const p=document.createElement("input");p.type="text",p.id="quote-location",p.value=this.formData.location,p.addEventListener("input",u=>{this.formData.location=u.target.value}),h.appendChild(g),h.appendChild(p),o.appendChild(a),o.appendChild(n),o.appendChild(c),o.appendChild(h),t.appendChild(e),t.appendChild(o),this.formSteps.appendChild(t),setTimeout(()=>{s.focus()},300)}renderThankYouStep(){if(!this.formSteps)return;const t=document.createElement("div");t.className="form-step thank-you-step";const e=document.createElement("div");e.className="thank-you-icon",e.innerHTML="✓";const o=document.createElement("h2");o.textContent="Thank you for your request!";const a=document.createElement("p");a.textContent="We have received your quote request and our team will get back to you shortly.";const i=document.createElement("a");i.className="whatsapp-button",i.href=`https://wa.me/919876543210?text=Hi,%20I%20just%20submitted%20a%20quote%20request%20for%20my%20${this.formData.projectType}%20project.%20I'd%20like%20to%20discuss%20it%20further.`,i.target="_blank",i.textContent="Continue on WhatsApp";const s=document.createElement("button");s.className="close-quote-button",s.textContent="Close",s.addEventListener("click",()=>this.closeModal()),t.appendChild(e),t.appendChild(o),t.appendChild(a),t.appendChild(i),t.appendChild(s),this.formSteps.appendChild(t),this.backButton&&(this.backButton.style.display="none"),this.nextButton&&(this.nextButton.style.display="none")}validateEmail(t){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)}validateField(t,e){e?(t.classList.remove("invalid"),t.classList.add("valid")):(t.classList.remove("valid"),t.classList.add("invalid"))}nextStep(){if(!this.validateCurrentStep())return;const t=this.formSteps?this.formSteps.querySelector(".form-step"):null;t&&(t.classList.remove("visible"),t.classList.add("exit")),setTimeout(()=>{this.currentStep++,this.renderStep(),this.updateButtons(),this.updateProgressBar()},300)}previousStep(){if(this.currentStep>0){const t=this.formSteps?this.formSteps.querySelector(".form-step"):null;t&&(t.classList.remove("visible"),t.classList.add("exit-reverse")),setTimeout(()=>{this.currentStep--,this.renderStep(),this.updateButtons(),this.updateProgressBar()},300)}}updateButtons(){if(!this.backButton||!this.nextButton)return;this.currentStep===0?this.backButton.style.visibility="hidden":this.backButton.style.visibility="visible",this.currentStep===this.totalSteps-1?this.nextButton.textContent="Submit":this.nextButton.textContent="Next";const t=this.validateCurrentStep();this.nextButton.disabled=!t,t?(this.nextButton.classList.remove("disabled"),this.nextButton.style.opacity="1",this.nextButton.style.cursor="pointer"):(this.nextButton.classList.add("disabled"),this.nextButton.style.opacity="0.5",this.nextButton.style.cursor="not-allowed")}updateProgressBar(){if(!this.progressBar)return;const t=this.currentStep/this.totalSteps*100;this.progressBar.style.width=`${t}%`}validateCurrentStep(){switch(this.currentStep){case 0:return!!this.formData.projectType;case 1:return!!this.formData.spaceSize;case 2:return!0;case 3:return!!this.formData.budget;case 4:return!!this.formData.timeline;case 5:return!!this.formData.name&&this.validateEmail(this.formData.email);default:return!0}}processForm(){console.log("Form submitted:",this.formData),this.nextStep()}renderMultistepForm(){this.renderProjectTypeStep(),this.renderSpaceSizeStep(),this.renderFeaturesStep(),this.renderBudgetStep(),this.renderTimelineStep(),this.renderContactInfoStep(),this.renderFormProgress()}}document.addEventListener("DOMContentLoaded",()=>{new x;const r=document.createElement("style");r.textContent=`
    /* Basic form structure with improved positioning */
    .quote-modal-container {
      position: relative;
      padding: 40px 30px 80px;
      max-width: 640px;
      margin: 4vh auto;
      border-radius: 12px;
      background-color: var(--color-background);
      color: var(--color-text);
      overflow-y: auto;
      max-height: 92vh;
    }

    .quote-close-button {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: none;
      cursor: pointer;
      z-index: 10;
    }

    .form-step {
      display: none;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.4s ease;
    }

    .form-step.active {
      display: block;
      opacity: 1;
      transform: translateY(0);
    }

    .form-step h2 {
      font-family: 'Canela', serif;
      font-size: 28px;
      margin-bottom: 2rem;
      font-weight: 300;
    }

    .option-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 2rem;
    }

    .form-progress-container {
      position: fixed;
      bottom: 125px;
      left: 0;
      width: 100%;
      height: 4px;
      background-color: rgba(30, 28, 27, 0.1);
      margin: 0.5rem 0;
      z-index: 10;
    }

    .form-progress-bar {
      height: 100%;
      background-color: var(--color-text);
      transition: width 0.4s ease;
    }

    .form-buttons {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem 2rem;
      background-color: var(--color-background);
      border-top: 1px solid rgba(30, 28, 27, 0.1);
      z-index: 10;
    }

    /* Improve spacing on small screens */
    @media (max-width: 768px) {
      .quote-modal-container {
        padding: 40px 20px 80px;
        max-height: 90vh;
        margin: 5vh auto;
      }

      .form-step h2 {
        font-size: 24px;
        margin-bottom: 1.5rem;
      }

      .option-list {
        gap: 12px;
      }

      .option {
        padding: 12px;
      }

      .contact-info-grid {
        grid-template-columns: 1fr;
      }

      .form-input {
        margin-bottom: 1.25rem;
      }

      .form-progress-container {
        bottom: 115px;
      }
    }

    /* Fix for iPhone */
    @media (max-width: 428px) {
      .quote-modal-container {
        padding: 40px 20px 90px;
        margin-top: 2vh;
        border-radius: 8px;
        max-height: 94vh;
      }

      .form-progress-container {
        bottom: 125px;
      }

      .form-buttons {
        padding: 1.5rem 1.25rem 2rem;
      }
    }
  `,document.head.appendChild(r)});class L{constructor(){this.popup=document.getElementById("project-popup"),this.overlay=document.querySelector(".popup-overlay"),this.closeButton=document.querySelector(".popup-close-button"),this.okButton=document.querySelector(".popup-button"),this.projectLinks=document.querySelectorAll(".project-item, .project-showcase"),this.init()}init(){this.projectLinks&&this.projectLinks.length>0&&this.projectLinks.forEach(t=>{t.addEventListener("click",e=>{e.preventDefault(),this.openPopup()})}),this.closeButton&&this.closeButton.addEventListener("click",()=>{this.closePopup()}),this.okButton&&this.okButton.addEventListener("click",()=>{this.closePopup()}),this.overlay&&this.overlay.addEventListener("click",()=>{this.closePopup()}),document.addEventListener("keydown",t=>{t.key==="Escape"&&this.popup&&this.popup.classList.contains("active")&&this.closePopup()})}openPopup(){this.popup&&(this.popup.classList.add("active"),document.body.style.overflow="hidden")}closePopup(){this.popup&&(this.popup.classList.remove("active"),document.body.style.overflow="")}}document.addEventListener("DOMContentLoaded",()=>{new L});document.addEventListener("DOMContentLoaded",()=>{console.log("53 Studios - Website Initialized"),"ontouchstart"in window||C()});function C(){const r=document.createElement("div");r.classList.add("custom-cursor"),document.body.appendChild(r);let t=0,e=0,o=0,a=0;document.addEventListener("mousemove",l=>{t=l.clientX,e=l.clientY});function i(){o+=(t-o)*.15,a+=(e-a)*.15,r.style.left=`${o}px`,r.style.top=`${a}px`,requestAnimationFrame(i)}i();const s=document.querySelectorAll(".menu-overlay, .quote-modal, .dark-background");function n(){for(const l of s){const c=l.getBoundingClientRect();if(t>=c.left&&t<=c.right&&e>=c.top&&e<=c.bottom&&window.getComputedStyle(l).display!=="none"&&window.getComputedStyle(l).visibility!=="hidden")return!0}return!1}function d(){n()?r.classList.add("on-dark"):r.classList.remove("on-dark"),requestAnimationFrame(d)}d(),document.addEventListener("mousedown",()=>{r.classList.add("cursor-active")}),document.addEventListener("mouseup",()=>{r.classList.remove("cursor-active")}),document.addEventListener("mouseleave",()=>{r.style.opacity="0"}),document.addEventListener("mouseenter",()=>{r.style.opacity="1"})}const b=document.createElement("style");b.textContent=`
  .custom-cursor {
    position: fixed;
    width: 8px;
    height: 8px;
    background-color: var(--color-text);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    opacity: 1;
    mix-blend-mode: exclusion; /* Makes it visible on all backgrounds */
  }

  /* White cursor on dark backgrounds */
  .custom-cursor.on-dark {
    background-color: white;
    mix-blend-mode: normal;
  }

  /* Active state only - no hover changes */
  .custom-cursor.cursor-active {
    transform: translate(-50%, -50%) scale(0.8);
  }

  /* Show normal cursor so the custom one complements it */
  body {
    cursor: auto;
  }

  /* All clickable elements should have pointer cursor */
  a, button, [role="button"], input, textarea, select, [tabindex]:not([tabindex="-1"]) {
    cursor: pointer;
  }

  @media (max-width: 768px) {
    .custom-cursor {
      display: none;
    }
  }
`;document.head.appendChild(b);
//# sourceMappingURL=main-C75r9_6Z.js.map
