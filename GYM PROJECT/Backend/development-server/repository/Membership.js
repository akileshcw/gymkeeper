const {Members,Membership} = require('../models')

// membership expired message
async function expiry_membership_router(){    
    const mbrshp = await Membership.findAll({raw: true,where : {status : 'Active'}})

    if(mbrshp){
        mbrshp.map(async(e)=>{    
            const mbr = await Members.findAll({
                attributes: ['phonenumber','name','client_id'],
                where: {
                    uuid : e.member
                }
            })
            var expiry_dates = []
            var cur_date = new Date()
            var exp_date = new Date(e.todate)
            var d_exp_date = exp_date
            d_exp_date.setDate(d_exp_date.getDate()-5)
            expiry_dates.push(d_exp_date)
            d_exp_date.setDate(d_exp_date.getDate()+3)
            expiry_dates.push(d_exp_date)
            d_exp_date.setDate(d_exp_date.getDate()+1)
            expiry_dates.push(d_exp_date)

            expiry_dates.forEach((e)=>{
                if(e.toUTCString().slice(0,16) === cur_date.toUTCString().slice(0,16)){                    
                    const diffTime = Math.abs(exp_date - e);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    client.messages
                    .create({
body:`Hi ${mbr[0].name} ( ${mbr[0].client_id} ). Your membership of ${e.month `month ${e.days ? e.days `days` : ''}`} plan is about to expire in ${diffDays} days (${exp_date}). Please renew your subscription to continue at ${exp_date.setDate(exp_date.getDate()+1)}. Thank you!
${cpy_name}`,
                        from: 'whatsapp:+918531058391',      
                        to: `whatsapp:+91${mbr[0].phonenumber}`
                    })
                    .then(message => console.log('frm expiry',message.sid))
                    .done();                
                }
            })
        })
    }
}

// membership expiry message
async function expired_membership_router(){
    const mbrshp = await Membership.findAll({raw: true})

    if(mbrshp){
        mbrshp.map(async(e)=>{    
            const mbr = await Members.findAll({
                attributes: ['phonenumber','name','client_id'],
                where: {
                    uuid : e.member
                }
            })
            var cur_date = new Date()
            var exp_date = new Date(e.todate)
            exp_date.setDate(exp_date.getDate()+1)

            if(cur_date.toUTCString().slice(0,16) === exp_date.toUTCString().slice(0,16)){
                console.log('Expired')
                client.messages
                .create({
                    body: `Hi ${mbr[0].name} (${mbr[0].client_id}). Your membership plan at ${e.frmdate} has expired. We wish to see you again to stay fit. It just takes a minute to renew your membership. Please renew you membership! Thank you!`,
                    from: 'whatsapp:+918531058391',      
                    to: `whatsapp:+91${mbr[0].phonenumber}`
                })
                .then(message => console.log('frm expired',message.sid))
                .done();                
            }
        })
    }
}

module.exports = {expiry_membership_router, expired_membership_router}
