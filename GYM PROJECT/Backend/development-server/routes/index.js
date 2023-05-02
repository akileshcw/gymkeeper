const AttendanceRoutes = require('../routes/Attendance/index')
const AuthenticationRoutes = require('../routes/Authentication/index')
const MembersRoutes = require('../routes/Members/index')
const MembershipRoutes = require('../routes/Membership/index')
const OrganizationRoutes = require('../routes/Organization/index')
const PackageRoutes = require('../routes/Package/index')

const callApplicationRoutes = (app) => {
    app.use([
            AttendanceRoutes,
            AuthenticationRoutes,
            MembersRoutes,
            MembershipRoutes,
            OrganizationRoutes,
            PackageRoutes
        ])

    // app.use(baseApiPath)
}

module.exports = callApplicationRoutes