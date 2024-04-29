export const Home = () => {

    return (
        <div className="container">
            <h1>WELCOME TO TASK MANAGEMENT SYSTEM</h1>
        </div>
    )
}

function formatDate(dateString) {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}