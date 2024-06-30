
import { useTranslation } from "react-i18next";


function foodTypes() {
  const { t } = useTranslation();

  const meatTypes = {
    huesosCarnosos: [
      {
        name: t("alitasDePollo"),
        img: require("../../assets/food/alitas_pollo.webp"),
      },
      {
        name: t("carcasasDePollo"),
        img: require("../../assets/food/carcasas_pollo.webp"),
      },
      {
        name: t("cuellosDePollo"),
        img: require("../../assets/food/cuello_pollo.webp"),
      },
      {
        name: t("puntasDeAlitasDePollo"),
        img: require("../../assets/food/puntas_alitas_pollo.webp"),
      },
      {
        name: t("traseroDePollo"),
        img: require("../../assets/food/trasero_pollo.webp"),
      },
      {
        name: t("alasDePavo"),
        img: require("../../assets/food/alas_pavo.webp"),
      },
      {
        name: t("carcasasDePavo"),
        img: require("../../assets/food/carcasa-de-pavo.webp"),
      },
      {
        name: t("cuellosDePavo"),
        img: require("../../assets/food/cuello_pavo.webp"),
      },
      {
        name: t("carcasasDePato"),
        img: require("../../assets/food/carcasa_pato.webp"),
      },
      {
        name: t("cuellosDePato"),
        img: require("../../assets/food/cuello_pato.webp"),
      },
      {
        name: t("costillasDeCerdo"),
        img: require("../../assets/food/costillas_cerdo.webp"),
      },
      {
        name: t("costillasDeConejo"),
        img: require("../../assets/food/costillas_conejo.webp"),
      },
      {
        name: t("costillasDeTernera"),
        img: require("../../assets/food/costillas_ternera.webp"),
      },
      {
        name: t("cuelloDeTernera"),
        img: require("../../assets/food/cuello-ternera.webp"),
      },
      {
        name: t("pechoDeTernera"),
        img: require("../../assets/food/pecho-de-ternera.webp"),
      },
      {
        name: t("cuelloDeCordero"),
        img: require("../../assets/food/cuello-cordero.webp"),
      },
      {
        name: t("faldaDeCordero"),
        img: require("../../assets/food/falda_cordero.webp"),
      },
    ],
    carne: [
      {
        name: t("pollo"),
        img: require("../../assets/food/pollo.webp"),
      },
      {
        name: t("pavo"),
        img: require("../../assets/food/pavo.webp"),
      },
      {
        name: t("pato"),
        img: require("../../assets/food/pato.webp"),
      },
      {
        name: t("gallina"),
        img: require("../../assets/food/gallina.webp"),
      },
      {
        name: t("ternera"),
        img: require("../../assets/food/ternera.webp"),
      },
      {
        name: t("cordero"),
        img: require("../../assets/food/cordero.webp"),
      },
      {
        name: t("conejo"),
        img: require("../../assets/food/conejo.webp"),
      },
      {
        name: t("cerdo"),
        img: require("../../assets/food/cerdo.webp"),
      },
      {
        name: t("cabra"),
        img: require("../../assets/food/cabra.webp"),
      },
      {
        name: t("ciervo"),
        img: require("../../assets/food/ciervo.webp"),
      },
      {
        name: t("caballo"),
        img: require("../../assets/food/caballo.webp"),
      },
      {
        name: t("toro"),
        img: require("../../assets/food/toro.webp"),
      },
      {
        name: t("avestruz"),
        img: require("../../assets/food/avestruz.webp"),
      },
      {
        name: t("canguro"),
        img: require("../../assets/food/canguro.webp"),
      },
      {
        name: t("corazonDePollo"),
        img: require("../../assets/food/corazon_pollo.webp"),
      },
      {
        name: t("corazonDePavo"),
        img: require("../../assets/food/corazon_pavo.webp"),
      },
      {
        name: t("corazonDePato"),
        img: require("../../assets/food/corazon_pato.webp"),
      },
      {
        name: t("corazonDeCerdo"),
        img: require("../../assets/food/corazon-de-cerdo.webp"),
      },
      {
        name: t("corazonDeCordero"),
        img: require("../../assets/food/corazon-cordero.webp"),
      },
      {
        name: t("corazonDevaca"),
        img: require("../../assets/food/corazon-vaca.webp"),
      },
      {
        name: t("lenguaDeTernera"),
        img: require("../../assets/food/lengua_ternera.webp"),
      },
      {
        name: t("lenguaDeCerdo"),
        img: require("../../assets/food/lengua_cerdo.webp"),
      },
      {
        name: t("lenguaDeCordero"),
        img: require("../../assets/food/lengua_cordero.webp"),
      },
      {
        name: t("mollejasDePollo"),
        img: require("../../assets/food/mollejas_pollo.webp"),
      },
      {
        name: t("mollejasDePavo"),
        img: require("../../assets/food/mollejas_pavo.webp"),
      },
      {
        name: t("mollejasDePato"),
        img: require("../../assets/food/mollejas_pato.webp"),
      },
      {
        name: t("tripaVerdeDeTernera"),
        img: require("../../assets/food/tripa_verde.webp"),
      },
    ],
    pescado: [
      {
        name: t("abadejo"),
        img: require("../../assets/food/pescado/abadejo.webp"),
      },
      {
        name: t("anchoa"),
        img: require("../../assets/food/pescado/anchoa.webp"),
      },
      {
        name: t("anguila"),
        img: require("../../assets/food/pescado/anguila.webp"),
      },
      {
        name: t("arenque"),
        img: require("../../assets/food/pescado/arenque.webp"),
      },
      {
        name: t("atun"),
        img: require("../../assets/food/pescado/atun.webp"),
      },
      {
        name: t("bacaladilla"),
        img: require("../../assets/food/pescado/bacaladilla.webp"),
      },
      {
        name: t("bacalao"),
        img: require("../../assets/food/pescado/bacalao.webp"),
      },
      {
        name: t("besugo"),
        img: require("../../assets/food/pescado/besugo.webp"),
      },
      {
        name: t("boqueron"),
        img: require("../../assets/food/pescado/boqueron.webp"),
      },
      {
        name: t("breca"),
        img: require("../../assets/food/pescado/breca.webp"),
      },
      {
        name: t("caballa"),
        img: require("../../assets/food/pescado/caballa.webp"),
      },
      {
        name: t("cabracho"),
        img: require("../../assets/food/pescado/cabracho.webp"),
      },
      {
        name: t("cazon"),
        img: require("../../assets/food/pescado/cazon.webp"),
      },
      {
        name: t("congrio"),
        img: require("../../assets/food/pescado/congrio.webp"),
      },
      {
        name: t("dorada"),
        img: require("../../assets/food/pescado/dorada.webp"),
      },
      {
        name: t("faneca"),
        img: require("../../assets/food/pescado/faneca.webp"),
      },
      {
        name: t("gallo"),
        img: require("../../assets/food/pescado/gallo.webp"),
      },
      {
        name: t("fletan"),
        img: require("../../assets/food/pescado/fletan.webp"),
      },
      {
        name: t("jurel"),
        img: require("../../assets/food/pescado/jurel.webp"),
      },
      {
        name: t("lamprea"),
        img: require("../../assets/food/pescado/lamprea.webp"),
      },
      {
        name: t("lenguado"),
        img: require("../../assets/food/pescado/lenguado.webp"),
      },
      {
        name: t("lubina"),
        img: require("../../assets/food/pescado/lubina.webp"),
      },
      {
        name: t("merluza"),
        img: require("../../assets/food/pescado/merluza.webp"),
      },
      {
        name: t("mero"),
        img: require("../../assets/food/pescado/mero.webp"),
      },
      {
        name: t("mujol"),
        img: require("../../assets/food/pescado/mujol.webp"),
      },
      {
        name: t("palometa"),
        img: require("../../assets/food/pescado/palometa.webp"),
      },
      {
        name: t("pescadilla"),
        img: require("../../assets/food/pescado/pescadilla.webp"),
      },
      {
        name: t("platija"),
        img: require("../../assets/food/pescado/platija.webp"),
      },
      {
        name: t("rape"),
        img: require("../../assets/food/pescado/rape.webp"),
      },
      {
        name: t("raya"),
        img: require("../../assets/food/pescado/raya.webp"),
      },
      {
        name: t("rodaballo"),
        img: require("../../assets/food/pescado/rodaballo.webp"),
      },
      {
        name: t("rosada"),
        img: require("../../assets/food/pescado/rosada.webp"),
      },
      {
        name: t("salmonete"),
        img: require("../../assets/food/pescado/salmonete.webp"),
      },
      {
        name: t("salmon"),
        img: require("../../assets/food/pescado/salmon.webp"),
      },
      {
        name: t("sama"),
        img: require("../../assets/food/pescado/sama.webp"),
      },
      {
        name: t("sardina"),
        img: require("../../assets/food/pescado/sardina.webp"),
      },
      {
        name: t("trucha"),
        img: require("../../assets/food/pescado/trucha.webp"),
      },
    ],
    higado: [
      {
        name: t("higadoDeCerdo"),
        img: require("../../assets/food/higado/higado-cerdo.webp"),
      },
      {
        name: t("higadoDeTernera"),
        img: require("../../assets/food/higado/higado-ternera.webp"),
      },
      {
        name: t("higadoDeCabra"),
        img: require("../../assets/food/higado/higado-cabra.webp"),
      },
      {
        name: t("higadoDeConejo"),
        img: require("../../assets/food/higado/higado-conejo.webp"),
      },
      {
        name: t("higadoDeCordero"),
        img: require("../../assets/food/higado/higado-cordero.webp"),
      },
      {
        name: t("higadoDePollo"),
        img: require("../../assets/food/higado/higado-pollo.webp"),
      },
      {
        name: t("higadoDeCaballo"),
        img: require("../../assets/food/higado/higado-caballo.webp"),
      },
    ],
    masvisceras: [
      {
        name: t("asaduraDeCerdo"),
        img: require("../../assets/food/mas_visceras/asadura-cerdo.webp"),
      },
      {
        name: t("asaduraDeConejo"),
        img: require("../../assets/food/mas_visceras/asadura-conejo.webp"),
      },
      {
        name: t("asaduraDeTernera"),
        img: require("../../assets/food/mas_visceras/asadura-ternera.webp"),
      },
      {
        name: t("bazoDeCaballo"),
        img: require("../../assets/food/mas_visceras/bazo-caballo.webp"),
      },
      {
        name: t("bazoDeCerdo"),
        img: require("../../assets/food/mas_visceras/bazo-cerdo.webp"),
      },
      {
        name: t("bazoDeCordero"),
        img: require("../../assets/food/mas_visceras/bazo-cordero.webp"),
      },
      {
        name: t("bazoDeTernera"),
        img: require("../../assets/food/mas_visceras/bazo-ternera.webp"),
      },
      {
        name: t("criadillaDeCaballo"),
        img: require("../../assets/food/mas_visceras/criadillas-caballo.webp"),
      },
      {
        name: t("criadillaDeCerdo"),
        img: require("../../assets/food/mas_visceras/criadilla-cerdo.webp"),
      },
      {
        name: t("criadillaDeCordero"),
        img: require("../../assets/food/mas_visceras/criadilla-cordero.webp"),
      },
      {
        name: t("criadillaDeToro"),
        img: require("../../assets/food/mas_visceras/criadilla-toro.webp"),
      },
      {
        name: t("mollejaDeCaballo"),
        img: require("../../assets/food/mas_visceras/mollejas-caballo.webp"),
      },
      {
        name: t("mollejaDeCordero"),
        img: require("../../assets/food/mas_visceras/mollejas-cordero.webp"),
      },
      {
        name: t("mollejaDeTernera"),
        img: require("../../assets/food/mas_visceras/mollejas-ternera.webp"),
      },
      {
        name: t("pulmonDeCaballo"),
        img: require("../../assets/food/mas_visceras/pulmon-caballo.webp"),
      },
      {
        name: t("pulmonDeCerdo"),
        img: require("../../assets/food/mas_visceras/asadura-cerdo.webp"),
      },
      {
        name: t("pulmonDeCordero"),
        img: require("../../assets/food/mas_visceras/pulmon-cordero.webp"),
      },
      {
        name: t("pulmonDeTernera"),
        img: require("../../assets/food/mas_visceras/pulmon-ternera.webp"),
      },
      {
        name: t("pancreasDeCerdo"),
        img: require("../../assets/food/mas_visceras/pancreas-cerdo.webp"),
      },
      {
        name: t("pancreasDeTernera"),
        img: require("../../assets/food/mas_visceras/pancreas-ternera.webp"),
      },
      {
        name: t("rinonDeCerdo"),
        img: require("../../assets/food/mas_visceras/riñones-cerdo.webp"),
      },
      {
        name: t("rinonDeCordero"),
        img: require("../../assets/food/mas_visceras/riñones-cordero.webp"),
      },
      {
        name: t("rinonDeTernera"),
        img: require("../../assets/food/mas_visceras/rinon-ternera.webp"),
      },
      {
        name: t("sesosDeCaballo"),
        img: require("../../assets/food/mas_visceras/sesos-caballo.webp"),
      },
      {
        name: t("sesosDeCerdo"),
        img: require("../../assets/food/mas_visceras/sesos-cerdo.webp"),
      },
      {
        name: t("sesosDeCordero"),
        img: require("../../assets/food/mas_visceras/sesos-cordero.webp"),
      },
      {
        name: t("sesosDeTernera"),
        img: require("../../assets/food/mas_visceras/sesos-ternera.webp"),
      },
    ],
    frutasverduras: [
      {
        name: t("manzana"),
        img: require("../../assets/food/frutasverduras/manzana.webp"),
      },
      {
        name: t("zanahoria"),
        img: require("../../assets/food/frutasverduras/zanahoria.webp"),
      },
      {
        name: t("acelga"),
        img: require("../../assets/food/frutasverduras/acelga.webp"),
      },
      {
        name: t("alcachofa"),
        img: require("../../assets/food/frutasverduras/alcachofa.webp"),
      },
      {
        name: t("apio"),
        img: require("../../assets/food/frutasverduras/apio.webp"),
      },
      {
        name: t("albaricoque"),
        img: require("../../assets/food/frutasverduras/albaricoque.webp"),
      },
      {
        name: t("arandano"),
        img: require("../../assets/food/frutasverduras/arandano.webp"),
      },
      {
        name: t("boniato"),
        img: require("../../assets/food/frutasverduras/boniato.webp"),
      },
      {
        name: t("berza"),
        img: require("../../assets/food/frutasverduras/berza.webp"),
      },
      {
        name: t("berro"),
        img: require("../../assets/food/frutasverduras/berro.webp"),
      },
      {
        name: t("brocoli"),
        img: require("../../assets/food/frutasverduras/brocoli.webp"),
      },
      {
        name: t("canonigo"),
        img: require("../../assets/food/frutasverduras/canonigo.webp"),
      },
      {
        name: t("calabaza"),
        img: require("../../assets/food/frutasverduras/calabaza.webp"),
      },
      {
        name: t("calabacin"),
        img: require("../../assets/food/frutasverduras/calabacin.webp"),
      },
      {
        name: t("caqui"),
        img: require("../../assets/food/frutasverduras/caqui.webp"),
      },
      {
        name: t("cereza"),
        img: require("../../assets/food/frutasverduras/cereza.webp"),
      },
      {
        name: t("champinon"),
        img: require("../../assets/food/frutasverduras/champinion.webp"),
      },
      {
        name: t("chirimoya"),
        img: require("../../assets/food/frutasverduras/chirimoya.webp"),
      },
      {
        name: t("ciruela"),
        img: require("../../assets/food/frutasverduras/ciruela.webp"),
      },
      {
        name: t("coco"),
        img: require("../../assets/food/frutasverduras/coco.webp"),
      },
      {
        name: t("col"),
        img: require("../../assets/food/frutasverduras/col.webp"),
      },
      {
        name: t("coliflor"),
        img: require("../../assets/food/frutasverduras/coliflor.webp"),
      },
      {
        name: t("datil"),
        img: require("../../assets/food/frutasverduras/datil.webp"),
      },
      {
        name: t("escarola"),
        img: require("../../assets/food/frutasverduras/escarola.webp"),
      },
      {
        name: t("espinaca"),
        img: require("../../assets/food/frutasverduras/espinaca.webp"),
      },
      {
        name: t("esparrago"),
        img: require("../../assets/food/frutasverduras/esparrago.webp"),
      },
      {
        name: t("frambuesa"),
        img: require("../../assets/food/frutasverduras/frambruesa.webp"),
      },
      {
        name: t("fresa"),
        img: require("../../assets/food/frutasverduras/fresa.webp"),
      },
      {
        name: t("granada"),
        img: require("../../assets/food/frutasverduras/granada.webp"),
      },
      {
        name: t("grosella"),
        img: require("../../assets/food/frutasverduras/grosella.webp"),
      },
      {
        name: t("higo"),
        img: require("../../assets/food/frutasverduras/higo.webp"),
      },
      {
        name: t("judiaVerde"),
        img: require("../../assets/food/frutasverduras/judiasverdes.webp"),
      },
      {
        name: t("kiwi"),
        img: require("../../assets/food/frutasverduras/kiwi.webp"),
      },
      {
        name: t("lechuga"),
        img: require("../../assets/food/frutasverduras/lechuga.webp"),
      },
      {
        name: t("mandarina"),
        img: require("../../assets/food/frutasverduras/mandarina.webp"),
      },
      {
        name: t("melocoton"),
        img: require("../../assets/food/frutasverduras/melocoton.webp"),
      },
      {
        name: t("melon"),
        img: require("../../assets/food/frutasverduras/melon.webp"),
      },
      {
        name: t("mora"),
        img: require("../../assets/food/frutasverduras/mora.webp"),
      },
      {
        name: t("nabo"),
        img: require("../../assets/food/frutasverduras/nabo.webp"),
      },
      {
        name: t("naranja"),
        img: require("../../assets/food/frutasverduras/naranja.webp"),
      },
      {
        name: t("papaya"),
        img: require("../../assets/food/frutasverduras/papaya.webp"),
      },
      {
        name: t("patata"),
        img: require("../../assets/food/frutasverduras/patata.webp"),
      },
      {
        name: t("pepino"),
        img: require("../../assets/food/frutasverduras/pepino.webp"),
      },
      {
        name: t("pera"),
        img: require("../../assets/food/frutasverduras/pera.webp"),
      },
      {
        name: t("pimientoRojo"),
        img: require("../../assets/food/frutasverduras/pimientorojo.webp"),
      },
      {
        name: t("pina"),
        img: require("../../assets/food/frutasverduras/pina.webp"),
      },
      {
        name: t("platano"),
        img: require("../../assets/food/frutasverduras/platano.webp"),
      },
      {
        name: t("remolacha"),
        img: require("../../assets/food/frutasverduras/remolacha.webp"),
      },
      {
        name: t("repollo"),
        img: require("../../assets/food/frutasverduras/repollo.webp"),
      },
      {
        name: t("rabano"),
        img: require("../../assets/food/frutasverduras/rabano.webp"),
      },
      {
        name: t("sandia"),
        img: require("../../assets/food/frutasverduras/sandia.webp"),
      },
      {
        name: t("seta"),
        img: require("../../assets/food/frutasverduras/seta.webp"),
      },
      {
        name: t("tomate"),
        img: require("../../assets/food/frutasverduras/tomate.webp"),
      },
      {
        name: t("yuca"),
        img: require("../../assets/food/frutasverduras/yuca.webp"),
      },
    ],
  };

  return meatTypes
}
export default foodTypes
