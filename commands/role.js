const Discord = require("discord.js");

// Welcome to role management
exports.run = (client, message, args) => {
  console.log(`**********Executing role on ${message.guild.name}**********`);

  var author = message.member; // author object
  let str = message.content; // "--role role"
  let desiredRole = str
    .toLowerCase()
    .replace("--role ", "", -1)
    .replace(/-/g, "", -1)
    .replace(/ /g, "", -1); // "role"
  console.log(desiredRole);
  let guild = message.guild; // guild snowflake
  let guildRoles = guild.roles; // role snowflake
  console.log(`Desired role: ${desiredRole}`);
  console.log(`Results: ${guildRoles.find(role => role.name === desiredRole)}`);

  // Checks to see if the desiredRole is equal to any role object's name property
  if (!!guildRoles.find(role => role.name.toLowerCase() === desiredRole)) {
    console.log("Guild has desired role");
    // Finds the guild's equivalent of the desiredRole
    let desiredGuildRole = guildRoles.find(
      role => role.name.toLowerCase() === desiredRole
    );

    // Horrifying if/else block for determing roles
    // This system prevents assigning of roles outside of intoxicated ones
    // TODO - make this a switch or something
    // Currently servers must use these named roles
    if (desiredGuildRole.name.toLowerCase() === "tripping") {
      toggleRole(desiredGuildRole, author);
    } else if (desiredGuildRole.name.toLowerCase() === "stimmed") {
      toggleRole(desiredGuildRole, author);
    } else if (desiredGuildRole.name.toLowerCase() === "barred") {
      toggleRole(desiredGuildRole, author);
    } else if (desiredGuildRole.name.toLowerCase() === "nodding") {
      toggleRole(desiredGuildRole, author);
    } else if (desiredGuildRole.name.toLowerCase() === "drunk") {
      toggleRole(desiredGuildRole, author);
    } else if (desiredGuildRole.name.toLowerCase() === "dissod") {
      toggleRole(desiredGuildRole, author);
    } else if (desiredGuildRole.name.toLowerCase() === "rolling") {
      toggleRole(desiredGuildRole, author);
    } else if (desiredGuildRole.name.toLowerCase() === "stoned") {
      toggleRole(desiredGuildRole, author);
    } else if (desiredGuildRole.name.toLowerCase() === "hungover") {
      toggleRole(desiredGuildRole, author);
    } else if (desiredGuildRole.name.toLowerCase() === "delirious") {
      toggleRole(desiredGuildRole, author);
    } else if (desiredGuildRole.name.toLowerCase() === "altered") {
      toggleRole(desiredGuildRole, author);
    } else {
      // Send message stating role cannot be assigned
      message.channel.send(
        `Error: DoseBot cannot assign role **${desiredRole}**`
      );
    }
  } else {
    // Send a message stating role does not exist on server
    console.log("Guild does not have desired role");
    message.channel.send(`Error: Guild does not have **${desiredRole}** role`);
  }
  //// Functions
  // Function for toggling the role of a user based on their current role state
  function toggleRole(roleToApply, author) {
    // if (message.guild.id === "469206008078663691") {
    //   console.log(`we're on the SED!`);
    //   let nickName = message.member.nickname;
    //   console.log(`nickname: ${nickName}`);
    //   message.member.setNickname(`Doofus`).catch(console.error);
    // }
    setTripNickName();

    // if (!!author.roles.find(role => role.name === roleToApply.name)) {
    //   // Removes role
    //   removeRole(roleToApply, author);
    // } else {
    //   // Adds role
    //   console.log(`Added ${desiredRole} to <@${message.author.id}>`);
    //   author.addRole(roleToApply.id).catch(console.error);
    //   message.channel.send(
    //     `Added **${desiredRole}** to <@${message.author.id}>`
    //   );
    //   // Define an async function to handle automatic role removal
    //   const delay = duration =>
    //     new Promise(resolve => setTimeout(resolve, duration));
    //   // Delay for 8 hours and then remove role
    //   const asyncFunc = () => {
    //     delay(28800000).then(() => {
    //       console.log(
    //         `Removed **${roleToApply.name}** from ${author.displayName}`
    //       );
    //       author.removeRole(roleToApply.id).catch(console.error);
    //       message.channel.send(
    //         `Removed **${roleToApply.name}** from <@${
    //           message.author.id
    //         }> - Role timer expired`
    //       );
    //     });
    //   };
    //   asyncFunc();
    // }
    if (!!author.roles.find(role => role.name === roleToApply.name)) {
      // Removes role
      removeRole(roleToApply, author);
    } else {
      // Adds role
      addRole(roleToApply, author);
    }

    function addRole(roleToApply, author) {
      // Log role and author and add role
      console.log(`Added ${desiredRole} to <@${message.author.id}>`);
      author.addRole(roleToApply.id).catch(console.error);
      // Send message to channel
      message.channel.send(
        `Added **${desiredRole}** to <@${message.author.id}>`
      );
      // Change nickname
      setTripNickName();
      // Define an async function to handle automatic role removal
      const delay = duration =>
        new Promise(resolve => setTimeout(resolve, duration));
      // Delay for 8 hours and then remove role
      const asyncFunc = () => {
        delay(5000).then(() => {
          // 28800000ms
          console.log(
            `Removed **${roleToApply.name}** from ${author.displayName}`
          );
          author.removeRole(roleToApply.id).catch(console.error);
          restoreNickName(nickName);
          message.channel.send(
            `Removed **${roleToApply.name}** from <@${
              message.author.id
            }> - Role timer expired`
          );
        });
      };
      asyncFunc();
    }
    function removeRole(roleToApply, author) {
      console.log(`Removed ${desiredRole} from <@${message.author.id}>`);
      author.removeRole(roleToApply.id).catch(console.error);
      message.channel.send(
        `Removed **${desiredRole}** from <@${message.author.id}>`
      );
    }
    function setTripNickName() {
      if (message.guild.id === "469206008078663691") {
        const nickName = message.member.nickname;
        console.log(`Nickname: ${nickName}`);
        message.member.setNickname(`Doofus`).catch(console.error);
        console.log(message.member.nickname);
      }
    }
    function restoreNickName(nick) {
      if (message.guild.id === "469206008078663691") {
        console.log(message.member.nickname);
        console.log(`Restoring original nickname: ${nick}`);
        message.member.setNickname(nick).catch(console.error);
      }
    }
  }
};
