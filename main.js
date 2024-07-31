const URL = "https://cat-fact.herokuapp.com/facts";


const getfacts = async () => {
    console.log("getting data .....");
    let response = await fetch(URL);
    console.log(response);
}