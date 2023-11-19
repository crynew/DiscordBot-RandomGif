const c = require("../config.json");

module.exports = async (client, member) => {

    if(member.guild.id !== c.guild) return;
  
    const pig = c.pig;
    const dev = c.dev;
    const hype = c.hype;

    const badgeRoles = {
        'PremiumEarlySupporter': pig,
        'VerifiedDeveloper': dev,
        'Hypesquad': hype,
    }; 

    member.user.fetchFlags().then((flags) => {
      for (const badge in badgeRoles) {
          if (flags.has(badge)) {
              const roleID = badgeRoles[badge];

              try {
                  const role = guild.roles.cache.get(roleID);
                  if (role) {
                      member.roles.add(role);
                      console.log(`Cargo adicionado para ${member.user.username} (${badge})`);
                  } else {
                      console.error(`ID de cargo inválido para ${badge}: ${roleID}`);
                  }
              } catch (error) {
                  console.error(`Erro ao adicionar o cargo para ${member.user.username} (${badge}):`, error);
              }
          }
      }
  });


  }



  