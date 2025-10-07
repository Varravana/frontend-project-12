const MainPage = () => {
    const clearLS = () => {
        localStorage.clear()
        console.log(localStorage)
    }
    return (
        <>
        <div>Main page</div>
        <button onClick={()=> clearLS()}>очистить локалсторадж</button>
            </>
    )
}

export default MainPage