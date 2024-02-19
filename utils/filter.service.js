export function generateQuery(
  router,
  change,
  value = "",
  ischecked = true,
  query,
  fonlaniyorCheck
) {
  var newquery = { ...query };
  var qstring = "";
  if (change == "fonlaniyor") {
    if (query.fonlamaDurumu && query.fonlamaDurumu != "fonlandi") {
      newquery.fonlamaDurumu = "fonlaniyor";
      if (query.fonlamaDurumu == "fonlaniyor") {
        newquery.fonlamaDurumu = false;
      }
    } else {
      newquery.fonlamaDurumu = false;
      if (!query.fonlamaDurumu) {
        newquery.fonlamaDurumu = fonlaniyorCheck ? "fonlandi" : "fonlaniyor";
      }
    }
  } else if (change == "fonlandi") {
    if (query.fonlamaDurumu && query.fonlamaDurumu != "fonlaniyor") {
      newquery.fonlamaDurumu = "fonlandi";
      if (query.fonlamaDurumu == "fonlandi") {
        newquery.fonlamaDurumu = false;
      }
    } else {
      newquery.fonlamaDurumu = false;
      if (!query.fonlamaDurumu) {
        newquery.fonlamaDurumu = fonlandiCheck ? "fonlaniyor" : "fonlandi";
      }
    }
  } else if (change == "ismeGore" || change == "sonEklenenler") {
    newquery.siralama = change;
  } else if (change == "sektor") {
    if (ischecked) {
      if (newquery.sektor) {
        var sectors = newquery.sektor.split(",");
        sectors.push(value);
        newquery.sektor = sectors.join(",");
      } else {
        newquery.sektor = value;
      }
    } else {
      var sectors = newquery.sektor.split(",");
      newquery.sektor = sectors.filter((e) => e !== value);
      if (newquery.sektor.length == 0) newquery.sektor = false;
    }
  }
  if (newquery.fonlamaDurumu) {
    qstring = `?fonlamaDurumu=${newquery.fonlamaDurumu}`;
    if (newquery.siralama) {
      qstring += `&siralama=${newquery.siralama}`;
    }
  } else {
    if (newquery.siralama) {
      qstring = `?siralama=${newquery.siralama}`;
    }
  }
  if (newquery.sektor) {
    if (qstring != "") {
      qstring += `&sektor=${newquery.sektor}`;
    } else {
      qstring = `?sektor=${newquery.sektor}`;
    }
  }

  router.push(qstring);
}
