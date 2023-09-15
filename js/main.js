class GetData {
    url;
    data = null
    constructor(url) {
        this.url = url;

    }
    async getData() {
        await fetch(this.url)
            .then((response) => {
                return response.json();
            })
            .then((newData) => {
                this.data = newData.episodes
            })
        return this.data
    }
}


class Header {
    header;
    constructor() {
        this.header = document.createElement("header")
        this.header.classList = "title"

        this.figure = document.createElement("figure")
        this.figure.classList = "title__logo"

        this.icon = document.createElement("i")
        this.icon.classList = "fa-solid fa-globe"

        this.heading = document.createElement("h1")
        this.heading.classList = "title__text"
        this.heading.innerText = "Colletion of Happines"
    }
    render() {
        document.querySelector("body").appendChild(this.header);
        this.header.appendChild(this.figure);
        this.figure.appendChild(this.icon);
        this.header.appendChild(this.heading)
    }


    
}

class Main {
    data;
    main;
    leftSection;
    rightSection;
    firstImage;
    constructor(data) {
        this.data = data;
        this.main = document.createElement("main")
        this.main.classList = "happines"
        this.leftSection = new LeftSection(data, this.main, this)
        this.rightSection = new RightSection(this.main, this.firstImage, data)
    }

    render() {
        document.querySelector("body").appendChild(this.main);
        this.leftSection.render()
        this.rightSection.render()
    }

    rightChange(dataClick){
        this.rightSection.rightChange(dataClick);
    }


}

class LeftSection {
    leftSection;
    leftUl;
    data;
    main
    firstImage
    constructor(data, main, mainClass) {
        this.data = data;
        this.main = main
        this.leftSection = document.createElement("section");
        this.leftSection.classList = "happines__left";

        this.leftUl = document.createElement("ul");
        this.leftUl.classList = "happines__list";


        let usedInstances = [];
        for (let i = 0; i < 4; i++) {
            let randomNumber = this.randomizer();
            while (usedInstances.includes(randomNumber)) {
                randomNumber = this.randomizer();
            }
            usedInstances.push(randomNumber);




            this.listItem = document.createElement("li");
            this.listItem.classList = "happines__listItem"
            this.listItem.addEventListener("click", () => this.mainClass.rightChange(data[randomNumber]));
            this.listItem.addEventListener('click', () => {window.scrollTo({top: 0,behavior: 'smooth'});});

            this.smallFigure = document.createElement("figure");
            this.smallFigure.classList = "happines__image";

            this.imageDate = document.createElement("p")
            this.imageDate.classList = "happines__text happines__text--date"
            this.imageDate.innerText = data[randomNumber]["date (dd-mm-yyyy)"]

            this.smallImage = document.createElement("img");
            this.smallImage.classList = "happines__imageSmall";
            this.smallImage.setAttribute("src", data[randomNumber]["image"]["src"]);
            this.smallImage.setAttribute("alt", data[randomNumber]["image"]["alt"]);


            this.imageTitle = document.createElement("p")
            this.imageTitle.classList = "happines__text happines__text--title"
            this.imageTitle.innerText = data[randomNumber]["title"]


            this.leftUl.appendChild(this.listItem);
            this.listItem.appendChild(this.smallFigure);
            this.smallFigure.appendChild(this.imageDate);
            this.smallFigure.appendChild(this.smallImage);
            this.smallFigure.appendChild(this.imageTitle);
        }
        this.mainClass = mainClass
        this.mainClass.firstImage = usedInstances[0]
    }

    render() {
        this.main.appendChild(this.leftSection);
        this.leftSection.appendChild(this.leftUl)
    }

    randomizer() {
        return Math.floor(Math.random() * this.data.length);
    }
}

class RightSection {
    mainElement;
    firstImage;
    rightArticle;


    mainFigure
    imageDate;
    largeImage;
    imageTitle;

    rightSection;
    sectionText
    buttonSection
    downloadButtonBorder
    downloadButton
    sourceButton


    constructor(mainElement, firstImage, data) {
        this.mainElement = mainElement;
        this.firstImage = firstImage;
        console.log(this.firstImage)

        this.rightArticle = document.createElement("article");
        this.rightArticle.classList = "happines__right";

        this.mainFigure = document.createElement("figure");
        this.mainFigure.classList = "happines__image";

        this.imageDate = document.createElement("p")
        this.imageDate.classList = "happines__text happines__text--date"
        this.imageDate.innerText = data[this.firstImage]["date (dd-mm-yyyy)"]

        this.largeImage = document.createElement("img");
        this.largeImage.classList = "happines__imageLarge";
        this.largeImage.setAttribute("src", data[this.firstImage]["image"]["src"]);
        this.largeImage.setAttribute("alt", data[this.firstImage]["image"]["alt"]);


        this.imageTitle = document.createElement("p")
        this.imageTitle.classList = "happines__text happines__text--title"
        this.imageTitle.innerText = data[this.firstImage]["title"]


        this.rightSection = document.createElement("section");
        this.rightSection.classList = "happines__article";

        this.sectionText = document.createElement("p")
        this.sectionText.classList = "happines__articleText";
        this.sectionText.innerText = data[this.firstImage]["summary"]

        this.buttonSection = document.createElement("section");
        this.buttonSection.classList = "happines__button";

        this.downloadButtonBorder = document.createElement("button");
        this.downloadButtonBorder.classList = "happines__buttonBorder";
        this.downloadButtonBorder.addEventListener("click", () => window.location = data[this.firstImage]["audio"])

        this.downloadButton = document.createElement("p");
        this.downloadButton.classList = "happines__audio";
        this.downloadButton.innerText = "Download Audio"


        this.downloadButtonFigure = document.createElement("figure");
        this.downloadButtonFigure.classList = "happines__audio--figure"

        this.downloadButtonIcon = document.createElement("i");
        this.downloadButtonIcon.classList = "fa-solid fa-download";


        



        this.sourceButton = document.createElement("a");
        this.sourceButton.classList = "happines__source"
        this.sourceButton.innerText = "Source >"
        this.sourceButton.setAttribute("href", data[this.firstImage]["url"]);    
        this.sourceButton.setAttribute("target", "_blank");


      
        // <article class="happines__right">
        //     <figure class="happines__mainImage">
        //         <p class="happines__text happines__text--date">02-03-2023</p>
        //         <img class="happines__imageLarge" src="img/1.webp" alt="">
        //         <p class="happines__text happines__text--title">Why We Need Friends with Shared Interest</p>
        //     </figure>
        //     <section class="happines__article">
        //         <p class="happines__articleText">
        //         </p>
        //         <section class="happines__button">
        //             <div class="happines__buttonBorder">
        //                 <button class="happines__audio">Download Audio</button>
        //             </div>
        //             <button class="happines__source">source ></button>
        //         </section>
        //     </section>
        // </article>
    }

    rightChange(clickedArticle) {
        this.imageDate.innerText = clickedArticle["date (dd-mm-yyyy)"];


        this.largeImage.setAttribute("src", clickedArticle["image"]["src"]);
        this.largeImage.setAttribute("alt", clickedArticle["image"]["alt"]);

        this.imageTitle.innerText = clickedArticle["title"];

        this.sectionText.innerText = clickedArticle["summary"];


        this.downloadButton.addEventListener("click", () => window.location = clickedArticle["audio"]);

        this.sourceButton.setAttribute("href", clickedArticle["url"]);
    }


    render(){
        this.mainElement.appendChild(this.rightArticle);
        this.rightArticle.appendChild(this.mainFigure)
        this.mainFigure.appendChild(this.imageDate)
        this.mainFigure.appendChild(this.largeImage)
        this.mainFigure.appendChild(this.imageTitle)

        this.rightArticle.appendChild(this.rightSection);
        this.rightSection.appendChild(this.sectionText);
        this.rightSection.appendChild(this.buttonSection)
        this.buttonSection.appendChild(this.downloadButtonBorder)
        this.downloadButtonBorder.appendChild(this.downloadButton)
        this.downloadButtonBorder.appendChild(this.downloadButtonFigure);
        this.downloadButtonFigure.appendChild(this.downloadButtonIcon)
        this.buttonSection.appendChild(this.sourceButton)

    }
}

class Footer{
    constructor(){
        this.footer = document.createElement("footer")
        this.footer.classList = "footer"

        this.footerText = document.createElement("p")
        this.footerText.classList = "footer__para"
        this.footerText.innerText = "gemaakt door Luc Zuidema SD2D MediaCollege."
        // <footer class="footer">
        // <p class="footer__para">gemaakt door Luc Zuidema SD2D MediaCollege.</p>
        // </footer>
    }

    render(){
        document.querySelector("body").appendChild(this.footer);
        this.footer.appendChild(this.footerText)
    }
}


class App {
    getData;
    header;
    main;
    constructor() {
        this.getData = new GetData("./data/data.json");
        this.header = new Header();
        this.footer = new Footer();
        this.header.render();

        this.getData.getData().then((data) => {
            this.main = new Main(data);
            this.main.render()
            
            this.footer.render();
        });
        
    }
}

const app = new App();