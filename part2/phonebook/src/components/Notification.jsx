const Notification = ({notificationProps}) => {
    if (notificationProps === null) {
        return null
    }
    return ( 
        <div className={notificationProps.type}>
            {notificationProps.message}
        </div>
    )
}

export default Notification