export const resetPasswordTemplate = (token, id) => {
    return`
        <html>
            <h1>Reset Your Password</h1>
            <p>Click  <a href="http://localhost:3000/reset-password/${token}/${id}" target="-blank">here</a></p>
        </html>
`


}
