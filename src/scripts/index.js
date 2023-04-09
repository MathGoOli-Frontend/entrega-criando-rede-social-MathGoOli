import {users, posts, suggestUsers} from './database.js'

function createUserCard(user, style){
    const figure = document.createElement('figure')
    figure.className = style + "figure"

    const img = document.createElement('img')
    img.className = style + "userPhoto"
    img.src = user.img

    const div = document.createElement('div')
    div.className = style + "userLabel"

    const h3UserName = document.createElement('h3')
    h3UserName.className = style + "userName"
    h3UserName.innerText = user.user

    const h3UserTitle = document.createElement('h3')
    h3UserTitle.className = style + "userTitle"
    h3UserTitle.innerText = user.stack

    // montando
    
    div.appendChild(h3UserName)
    div.appendChild(h3UserTitle)
    figure.appendChild(img)
    figure.appendChild(div)

    // console.log(figure)
    return figure
}

function createSugestionCard(user){
    const li = document.createElement('li')
    li.className = "userCard__container"

    const figure = createUserCard(user, "userCard__")

    const button = document.createElement('button')
    button.className = "userCard__button generic__button"
    button.innerHTML = "Seguir"
    button.dataset.userId = user.id
    button.dataset.isFollowed = false
    // function
    button.addEventListener("click", () => {
        if(button.dataset.isFollowed == 'false'){
            button.dataset.isFollowed = true
            button.className = "userCard__button button__outline"
            button.innerHTML = "Seguindo"
        } else if(button.dataset.isFollowed == 'true'){
            button.dataset.isFollowed = false
            button.className = "userCard__button generic__button"
            button.innerHTML = "Seguir"
        }
    })
    // montar

    li.appendChild(figure)
    li.appendChild(button)

    return li
}

function createSugestion(){
    const deck = document.getElementsByClassName('sugestion__deck')[0]
    deck.innerHTML = ""

    for( let i = 0; i < suggestUsers.length; i++ ){
        deck.appendChild(createSugestionCard(suggestUsers[i]))
    }

}

function createPost(post, isFull){
    const li = document.createElement('li')
    li.className = "posts__card"

    const figure = createUserCard(post, "userCard__")

    const h2 = document.createElement('h2')
    h2.className = "posts__title"
    h2.innerText = post.title

    const p = document.createElement('p')
    p.className = "posts__text"
    if(isFull){
        p.innerText = post.text
    } else{
        p.innerText = post.text.slice(0, 125) +'...'
    }

    const div = document.createElement('div')
    div.className = "posts__menu"

    const button = document.createElement('button')
    button.className = "posts__button"
    button.innerText = "Abrir Post"

    const likeFigure = document.createElement('figure')
    likeFigure.classList = "posts__like"
    
    const img = document.createElement('img')
    img.src = "./src/assets/img/likeOff.svg"
    likeFigure.dataset.isLiked = false

    const span = document.createElement('span')
    span.innerText = post.likes

    button.dataset.postId = post.id
    // button function
    button.addEventListener('click', (event)=>{
        event.preventDefault()
        const id = parseInt(button.dataset.postId) - 1

        createPostModal(id)

    })
    // like function
    likeFigure.addEventListener('click', () => {
        if(likeFigure.dataset.isLiked == "false"){
            img.src = "./src/assets/img/like.svg"
            likeFigure.dataset.isLiked = true
            span.innerText = parseInt(span.innerText) + 1
        } else if(likeFigure.dataset.isLiked == "true"){
            likeFigure.dataset.isLiked = false
            img.src = "./src/assets/img/likeOff.svg"
            span.innerText = parseInt(span.innerText) - 1
        }
        
    })


    // montar
    li.appendChild(figure)
    li.appendChild(h2)
    li.appendChild(p)

    if(!isFull){
        div.appendChild(button)
    } 

    likeFigure.appendChild(img)
    likeFigure.appendChild(span)
    if(!isFull){
        div.appendChild(likeFigure)
    } 

    li.appendChild(div)

    return li
}

function createPosts(){
    const deck = document.getElementsByClassName('posts__deck')[0]
    deck.innerHTML = ""

    for (let i = 0; i < posts.length; i++){
        deck.appendChild(createPost(posts[i]))
    }

}

function createPostModal(id){
    const modal = document.getElementsByClassName("modal__container")[0]
    modal.innerHTML = ""
    const exitButton = document.createElement('button')
    exitButton.innerText = 'x'
    exitButton.className = "exitButton"


    const usercard = createUserCard(posts[id], "userCard__")
    const post = createPost(posts[id], true)


    exitButton.addEventListener('click', (event)=>{
        event.preventDefault()
        modal.close()
    })

    modal.appendChild(exitButton)
    modal.appendChild(post)
    modal.showModal()
}

function makePost(){
    const button = document.getElementsByClassName('makePost__button')[0]
    
    button.addEventListener('click', (event) => {
        event.preventDefault()
        const title = document.getElementsByClassName('makePost__title')[0]
        const description = document.getElementsByClassName('makePost__description')[0]

        const post = {
        id: (posts.length + 1),
        title: title.value,
        text: description.value,
        user: "Samuel Leão",
        stack: "Front end Engineer",
        img: "./src/assets/img/user1.svg",
        likes: 0
        }

        posts.push(post)
        
        createPosts()
    })


}
createSugestion()
createPosts()
makePost()
// createPostModal(1)