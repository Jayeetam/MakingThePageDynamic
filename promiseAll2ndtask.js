const posts = [
    {title: 'Post One', body: 'This is post one', createdAt: new Date().getTime()},
    {title: 'Post Two', body: 'This is post two', createdAt:new Date().getTime()}
    ];
    let intervalId = 0;
    
function getPosts(){
    clearInterval(intervalId);
    intervalId = setInterval(() => {
        let output = '';
        for(let i=0; i<posts.length; i++){
            output += `<li>${posts[i].title} - last updated ${(new Date().getTime() - posts[i].createdAt)/1000} seconds ago</li>`;
        }
        console.log('timer running id = ', intervalId)
        document.body.innerHTML = output;
    },1000)
}
    
function createPost(post, callback){
    setTimeout(() => {
        posts.push({ ...post, createdAt: new Date().getTime()});
        callback();
    },2000);
}

function create4thPost(post){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        posts.push({...post, createdAt: new Date().getTime()});
        const error = false;
        if (!error) {
            resolve();
        } else {
            reject('Error: Something went wrong');
        }
    },2000);;
    });
}

const user = {
    username: 'Jayeeta',
    lastActivitytime:'2nd of October'
}

function updateLastActivityTime(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            user.lastActivityTime = new Date().getTime();
            resolve(user.lastActivityTime)
        },1000)
    })
}
function userUpdatePosts(){
    Promise.all([create4thPost,updateLastActivityTime])
    .then(([createPostresolves, updatelastactivityTimeresolves]) =>{
        console.log(updatelastactivityTimeresolves)
    })
    .catch(err => console.log(err))
}

function deletePost(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(posts.length >0){
                const lastelement = posts.pop()
                resolve(lastelement);
            } else{
                reject('Array is empty now');
            }
        },1000);
    });
}
createPost({ title: 'Post Three', body: 'This is post Three'}, getPosts);  
create4thPost({ title: 'Post Four', body: 'This is post Four'})
.then(() => {
    getPosts();
    deletePost().then(() => {
        getPosts();
        deletePost().then(() => {
            getPosts();
            deletePost().then(() => {
                getPosts();
                deletePost().then(() => {})
                .catch((err)=>{
                    console.log('Inside catch block', err)
                })
            })
        })
    })
})
.catch(err => console.log(err))
    
