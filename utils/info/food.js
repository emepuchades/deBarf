
import { useTranslation } from "react-i18next";


function foodTypes() {
  const { t } = useTranslation();

  const meatTypes = {
    huesosCarnosos: [
      {
        name: t("food.alitasDePollo"),
        img: require("../../assets/food/alitas_pollo.webp"),
      },
      {
        name: t("food.carcasasDePollo"),
        img: require("../../assets/food/carcasas_pollo.webp"),
      },
      {
        name: t("food.cuellosDePollo"),
        img: require("../../assets/food/cuello_pollo.webp"),
      },
      {
        name: t("food.puntasDeAlitasDePollo"),
        img: require("../../assets/food/puntas_alitas_pollo.webp"),
      },
      {
        name: t("food.traseroDePollo"),
        img: require("../../assets/food/trasero_pollo.webp"),
      },
      {
        name: t("food.alasDePavo"),
        img: require("../../assets/food/alas_pavo.webp"),
      },
      {
        name: t("food.carcasasDePavo"),
        img: require("../../assets/food/carcasa-de-pavo.webp"),
      },
      {
        name: t("food.cuellosDePavo"),
        img: require("../../assets/food/cuello_pavo.webp"),
      },
      {
        name: t("food.carcasasDePato"),
        img: require("../../assets/food/carcasa_pato.webp"),
      },
      {
        name: t("food.cuellosDePato"),
        img: require("../../assets/food/cuello_pato.webp"),
      },
      {
        name: t("food.costillasDeCerdo"),
        img: require("../../assets/food/costillas_cerdo.webp"),
      },
      {
        name: t("food.costillasDeConejo"),
        img: require("../../assets/food/costillas_conejo.webp"),
      },
      {
        name: t("food.costillasDeTernera"),
        img: require("../../assets/food/costillas_ternera.webp"),
      },
      {
        name: t("food.cuelloDeTernera"),
        img: require("../../assets/food/cuello-ternera.webp"),
      },
      {
        name: t("food.pechoDeTernera"),
        img: require("../../assets/food/pecho-de-ternera.webp"),
      },
      {
        name: t("food.cuelloDeCordero"),
        img: require("../../assets/food/cuello-cordero.webp"),
      },
      {
        name: t("food.faldaDeCordero"),
        img: require("../../assets/food/falda_cordero.webp"),
      },
    ],
    carne: [
      {
        name: t("food.pollo"),
        img: require("../../assets/food/pollo.webp"),
      },
      {
        name: t("food.pavo"),
        img: require("../../assets/food/pavo.webp"),
      },
      {
        name: t("food.pato"),
        img: require("../../assets/food/pato.webp"),
      },
      {
        name: t("food.gallina"),
        img: require("../../assets/food/gallina.webp"),
      },
      {
        name: t("food.ternera"),
        img: require("../../assets/food/ternera.webp"),
      },
      {
        name: t("food.cordero"),
        img: require("../../assets/food/cordero.webp"),
      },
      {
        name: t("food.conejo"),
        img: require("../../assets/food/conejo.webp"),
      },
      {
        name: t("food.cerdo"),
        img: require("../../assets/food/cerdo.webp"),
      },
      {
        name: t("food.cabra"),
        img: require("../../assets/food/cabra.webp"),
      },
      {
        name: t("food.ciervo"),
        img: require("../../assets/food/ciervo.webp"),
      },
      {
        name: t("food.caballo"),
        img: require("../../assets/food/caballo.webp"),
      },
      {
        name: t("food.toro"),
        img: require("../../assets/food/toro.webp"),
      },
      {
        name: t("food.avestruz"),
        img: require("../../assets/food/avestruz.webp"),
      },
      {
        name: t("food.canguro"),
        img: require("../../assets/food/canguro.webp"),
      },
      {
        name: t("food.corazonDePollo"),
        img: require("../../assets/food/corazon_pollo.webp"),
      },
      {
        name: t("food.corazonDePavo"),
        img: require("../../assets/food/corazon_pavo.webp"),
      },
      {
        name: t("food.corazonDePato"),
        img: require("../../assets/food/corazon_pato.webp"),
      },
      {
        name: t("food.corazonDeCerdo"),
        img: require("../../assets/food/corazon-de-cerdo.webp"),
      },
      {
        name: t("food.corazonDeCordero"),
        img: require("../../assets/food/corazon-cordero.webp"),
      },
      {
        name: t("food.corazonDevaca"),
        img: require("../../assets/food/corazon-vaca.webp"),
      },
      {
        name: t("food.lenguaDeTernera"),
        img: require("../../assets/food/lengua_ternera.webp"),
      },
      {
        name: t("food.lenguaDeCerdo"),
        img: require("../../assets/food/lengua_cerdo.webp"),
      },
      {
        name: t("food.lenguaDeCordero"),
        img: require("../../assets/food/lengua_cordero.webp"),
      },
      {
        name: t("food.mollejasDePollo"),
        img: require("../../assets/food/mollejas_pollo.webp"),
      },
      {
        name: t("food.mollejasDePavo"),
        img: require("../../assets/food/mollejas_pavo.webp"),
      },
      {
        name: t("food.mollejasDePato"),
        img: require("../../assets/food/mollejas_pato.webp"),
      },
      {
        name: t("food.tripaVerdeDeTernera"),
        img: require("../../assets/food/tripa_verde.webp"),
      },
    ],
    pescado: [
      {
        name: t("food.abadejo"),
        img: require("../../assets/food/pescado/abadejo.webp"),
      },
      {
        name: t("food.anchoa"),
        img: require("../../assets/food/pescado/anchoa.webp"),
      },
      {
        name: t("food.anguila"),
        img: require("../../assets/food/pescado/anguila.webp"),
      },
      {
        name: t("food.arenque"),
        img: require("../../assets/food/pescado/arenque.webp"),
      },
      {
        name: t("food.atun"),
        img: require("../../assets/food/pescado/atun.webp"),
      },
      {
        name: t("food.bacaladilla"),
        img: require("../../assets/food/pescado/bacaladilla.webp"),
      },
      {
        name: t("food.bacalao"),
        img: require("../../assets/food/pescado/bacalao.webp"),
      },
      {
        name: t("food.besugo"),
        img: require("../../assets/food/pescado/besugo.webp"),
      },
      {
        name: t("food.boqueron"),
        img: require("../../assets/food/pescado/boqueron.webp"),
      },
      {
        name: t("food.breca"),
        img: require("../../assets/food/pescado/breca.webp"),
      },
      {
        name: t("food.caballa"),
        img: require("../../assets/food/pescado/caballa.webp"),
      },
      {
        name: t("food.cabracho"),
        img: require("../../assets/food/pescado/cabracho.webp"),
      },
      {
        name: t("food.cazon"),
        img: require("../../assets/food/pescado/cazon.webp"),
      },
      {
        name: t("food.congrio"),
        img: require("../../assets/food/pescado/congrio.webp"),
      },
      {
        name: t("food.dorada"),
        img: require("../../assets/food/pescado/dorada.webp"),
      },
      {
        name: t("food.faneca"),
        img: require("../../assets/food/pescado/faneca.webp"),
      },
      {
        name: t("food.gallo"),
        img: require("../../assets/food/pescado/gallo.webp"),
      },
      {
        name: t("food.fletan"),
        img: require("../../assets/food/pescado/fletan.webp"),
      },
      {
        name: t("food.jurel"),
        img: require("../../assets/food/pescado/jurel.webp"),
      },
      {
        name: t("food.lamprea"),
        img: require("../../assets/food/pescado/lamprea.webp"),
      },
      {
        name: t("food.lenguado"),
        img: require("../../assets/food/pescado/lenguado.webp"),
      },
      {
        name: t("food.lubina"),
        img: require("../../assets/food/pescado/lubina.webp"),
      },
      {
        name: t("food.merluza"),
        img: require("../../assets/food/pescado/merluza.webp"),
      },
      {
        name: t("food.mero"),
        img: require("../../assets/food/pescado/mero.webp"),
      },
      {
        name: t("food.mujol"),
        img: require("../../assets/food/pescado/mujol.webp"),
      },
      {
        name: t("food.palometa"),
        img: require("../../assets/food/pescado/palometa.webp"),
      },
      {
        name: t("food.pescadilla"),
        img: require("../../assets/food/pescado/pescadilla.webp"),
      },
      {
        name: t("food.platija"),
        img: require("../../assets/food/pescado/platija.webp"),
      },
      {
        name: t("food.rape"),
        img: require("../../assets/food/pescado/rape.webp"),
      },
      {
        name: t("food.raya"),
        img: require("../../assets/food/pescado/raya.webp"),
      },
      {
        name: t("food.rodaballo"),
        img: require("../../assets/food/pescado/rodaballo.webp"),
      },
      {
        name: t("food.rosada"),
        img: require("../../assets/food/pescado/rosada.webp"),
      },
      {
        name: t("food.salmonete"),
        img: require("../../assets/food/pescado/salmonete.webp"),
      },
      {
        name: t("food.salmon"),
        img: require("../../assets/food/pescado/salmon.webp"),
      },
      {
        name: t("food.sama"),
        img: require("../../assets/food/pescado/sama.webp"),
      },
      {
        name: t("food.sardina"),
        img: require("../../assets/food/pescado/sardina.webp"),
      },
      {
        name: t("food.trucha"),
        img: require("../../assets/food/pescado/trucha.webp"),
      },
    ],
    higado: [
      {
        name: t("food.higadoDeCerdo"),
        img: require("../../assets/food/higado/higado-cerdo.webp"),
      },
      {
        name: t("food.higadoDeTernera"),
        img: require("../../assets/food/higado/higado-ternera.webp"),
      },
      {
        name: t("food.higadoDeCabra"),
        img: require("../../assets/food/higado/higado-cabra.webp"),
      },
      {
        name: t("food.higadoDeConejo"),
        img: require("../../assets/food/higado/higado-conejo.webp"),
      },
      {
        name: t("food.higadoDeCordero"),
        img: require("../../assets/food/higado/higado-cordero.webp"),
      },
      {
        name: t("food.higadoDePollo"),
        img: require("../../assets/food/higado/higado-pollo.webp"),
      },
      {
        name: t("food.higadoDeCaballo"),
        img: require("../../assets/food/higado/higado-caballo.webp"),
      },
    ],
    masvisceras: [
      {
        name: t("food.asaduraDeCerdo"),
        img: require("../../assets/food/mas_visceras/asadura-cerdo.webp"),
      },
      {
        name: t("food.asaduraDeConejo"),
        img: require("../../assets/food/mas_visceras/asadura-conejo.webp"),
      },
      {
        name: t("food.asaduraDeTernera"),
        img: require("../../assets/food/mas_visceras/asadura-ternera.webp"),
      },
      {
        name: t("food.bazoDeCaballo"),
        img: require("../../assets/food/mas_visceras/bazo-caballo.webp"),
      },
      {
        name: t("food.bazoDeCerdo"),
        img: require("../../assets/food/mas_visceras/bazo-cerdo.webp"),
      },
      {
        name: t("food.bazoDeCordero"),
        img: require("../../assets/food/mas_visceras/bazo-cordero.webp"),
      },
      {
        name: t("food.bazoDeTernera"),
        img: require("../../assets/food/mas_visceras/bazo-ternera.webp"),
      },
      {
        name: t("food.criadillaDeCaballo"),
        img: require("../../assets/food/mas_visceras/criadillas-caballo.webp"),
      },
      {
        name: t("food.criadillaDeCerdo"),
        img: require("../../assets/food/mas_visceras/criadilla-cerdo.webp"),
      },
      {
        name: t("food.criadillaDeCordero"),
        img: require("../../assets/food/mas_visceras/criadilla-cordero.webp"),
      },
      {
        name: t("food.criadillaDeToro"),
        img: require("../../assets/food/mas_visceras/criadilla-toro.webp"),
      },
      {
        name: t("food.mollejaDeCaballo"),
        img: require("../../assets/food/mas_visceras/mollejas-caballo.webp"),
      },
      {
        name: t("food.mollejaDeCordero"),
        img: require("../../assets/food/mas_visceras/mollejas-cordero.webp"),
      },
      {
        name: t("food.mollejaDeTernera"),
        img: require("../../assets/food/mas_visceras/mollejas-ternera.webp"),
      },
      {
        name: t("food.pulmonDeCaballo"),
        img: require("../../assets/food/mas_visceras/pulmon-caballo.webp"),
      },
      {
        name: t("food.pulmonDeCerdo"),
        img: require("../../assets/food/mas_visceras/asadura-cerdo.webp"),
      },
      {
        name: t("food.pulmonDeCordero"),
        img: require("../../assets/food/mas_visceras/pulmon-cordero.webp"),
      },
      {
        name: t("food.pulmonDeTernera"),
        img: require("../../assets/food/mas_visceras/pulmon-ternera.webp"),
      },
      {
        name: t("food.pancreasDeCerdo"),
        img: require("../../assets/food/mas_visceras/pancreas-cerdo.webp"),
      },
      {
        name: t("food.pancreasDeTernera"),
        img: require("../../assets/food/mas_visceras/pancreas-ternera.webp"),
      },
      {
        name: t("food.rinonDeCerdo"),
        img: require("../../assets/food/mas_visceras/riñones-cerdo.webp"),
      },
      {
        name: t("food.rinonDeCordero"),
        img: require("../../assets/food/mas_visceras/riñones-cordero.webp"),
      },
      {
        name: t("food.rinonDeTernera"),
        img: require("../../assets/food/mas_visceras/rinon-ternera.webp"),
      },
      {
        name: t("food.sesosDeCaballo"),
        img: require("../../assets/food/mas_visceras/sesos-caballo.webp"),
      },
      {
        name: t("food.sesosDeCerdo"),
        img: require("../../assets/food/mas_visceras/sesos-cerdo.webp"),
      },
      {
        name: t("food.sesosDeCordero"),
        img: require("../../assets/food/mas_visceras/sesos-cordero.webp"),
      },
      {
        name: t("food.sesosDeTernera"),
        img: require("../../assets/food/mas_visceras/sesos-ternera.webp"),
      },
    ],
    frutasverduras: [
      {
        name: t("food.manzana"),
        img: require("../../assets/food/frutasverduras/manzana.webp"),
      },
      {
        name: t("food.zanahoria"),
        img: require("../../assets/food/frutasverduras/zanahoria.webp"),
      },
      {
        name: t("food.acelga"),
        img: require("../../assets/food/frutasverduras/acelga.webp"),
      },
      {
        name: t("food.alcachofa"),
        img: require("../../assets/food/frutasverduras/alcachofa.webp"),
      },
      {
        name: t("food.apio"),
        img: require("../../assets/food/frutasverduras/apio.webp"),
      },
      {
        name: t("food.albaricoque"),
        img: require("../../assets/food/frutasverduras/albaricoque.webp"),
      },
      {
        name: t("food.arandano"),
        img: require("../../assets/food/frutasverduras/arandano.webp"),
      },
      {
        name: t("food.boniato"),
        img: require("../../assets/food/frutasverduras/boniato.webp"),
      },
      {
        name: t("food.berza"),
        img: require("../../assets/food/frutasverduras/berza.webp"),
      },
      {
        name: t("food.berro"),
        img: require("../../assets/food/frutasverduras/berro.webp"),
      },
      {
        name: t("food.brocoli"),
        img: require("../../assets/food/frutasverduras/brocoli.webp"),
      },
      {
        name: t("food.canonigo"),
        img: require("../../assets/food/frutasverduras/canonigo.webp"),
      },
      {
        name: t("food.calabaza"),
        img: require("../../assets/food/frutasverduras/calabaza.webp"),
      },
      {
        name: t("food.calabacin"),
        img: require("../../assets/food/frutasverduras/calabacin.webp"),
      },
      {
        name: t("food.caqui"),
        img: require("../../assets/food/frutasverduras/caqui.webp"),
      },
      {
        name: t("food.cereza"),
        img: require("../../assets/food/frutasverduras/cereza.webp"),
      },
      {
        name: t("food.champinon"),
        img: require("../../assets/food/frutasverduras/champinion.webp"),
      },
      {
        name: t("food.chirimoya"),
        img: require("../../assets/food/frutasverduras/chirimoya.webp"),
      },
      {
        name: t("food.ciruela"),
        img: require("../../assets/food/frutasverduras/ciruela.webp"),
      },
      {
        name: t("food.coco"),
        img: require("../../assets/food/frutasverduras/coco.webp"),
      },
      {
        name: t("food.col"),
        img: require("../../assets/food/frutasverduras/col.webp"),
      },
      {
        name: t("food.coliflor"),
        img: require("../../assets/food/frutasverduras/coliflor.webp"),
      },
      {
        name: t("food.datil"),
        img: require("../../assets/food/frutasverduras/datil.webp"),
      },
      {
        name: t("food.escarola"),
        img: require("../../assets/food/frutasverduras/escarola.webp"),
      },
      {
        name: t("food.espinaca"),
        img: require("../../assets/food/frutasverduras/espinaca.webp"),
      },
      {
        name: t("food.esparrago"),
        img: require("../../assets/food/frutasverduras/esparrago.webp"),
      },
      {
        name: t("food.frambuesa"),
        img: require("../../assets/food/frutasverduras/frambruesa.webp"),
      },
      {
        name: t("food.fresa"),
        img: require("../../assets/food/frutasverduras/fresa.webp"),
      },
      {
        name: t("food.granada"),
        img: require("../../assets/food/frutasverduras/granada.webp"),
      },
      {
        name: t("food.grosella"),
        img: require("../../assets/food/frutasverduras/grosella.webp"),
      },
      {
        name: t("food.higo"),
        img: require("../../assets/food/frutasverduras/higo.webp"),
      },
      {
        name: t("food.judiaVerde"),
        img: require("../../assets/food/frutasverduras/judiasverdes.webp"),
      },
      {
        name: t("food.kiwi"),
        img: require("../../assets/food/frutasverduras/kiwi.webp"),
      },
      {
        name: t("food.lechuga"),
        img: require("../../assets/food/frutasverduras/lechuga.webp"),
      },
      {
        name: t("food.mandarina"),
        img: require("../../assets/food/frutasverduras/mandarina.webp"),
      },
      {
        name: t("food.melocoton"),
        img: require("../../assets/food/frutasverduras/melocoton.webp"),
      },
      {
        name: t("food.melon"),
        img: require("../../assets/food/frutasverduras/melon.webp"),
      },
      {
        name: t("food.mora"),
        img: require("../../assets/food/frutasverduras/mora.webp"),
      },
      {
        name: t("food.nabo"),
        img: require("../../assets/food/frutasverduras/nabo.webp"),
      },
      {
        name: t("food.naranja"),
        img: require("../../assets/food/frutasverduras/naranja.webp"),
      },
      {
        name: t("food.papaya"),
        img: require("../../assets/food/frutasverduras/papaya.webp"),
      },
      {
        name: t("food.patata"),
        img: require("../../assets/food/frutasverduras/patata.webp"),
      },
      {
        name: t("food.pepino"),
        img: require("../../assets/food/frutasverduras/pepino.webp"),
      },
      {
        name: t("food.pera"),
        img: require("../../assets/food/frutasverduras/pera.webp"),
      },
      {
        name: t("food.pimientoRojo"),
        img: require("../../assets/food/frutasverduras/pimientorojo.webp"),
      },
      {
        name: t("food.pina"),
        img: require("../../assets/food/frutasverduras/pina.webp"),
      },
      {
        name: t("food.platano"),
        img: require("../../assets/food/frutasverduras/platano.webp"),
      },
      {
        name: t("food.remolacha"),
        img: require("../../assets/food/frutasverduras/remolacha.webp"),
      },
      {
        name: t("food.repollo"),
        img: require("../../assets/food/frutasverduras/repollo.webp"),
      },
      {
        name: t("food.rabano"),
        img: require("../../assets/food/frutasverduras/rabano.webp"),
      },
      {
        name: t("food.sandia"),
        img: require("../../assets/food/frutasverduras/sandia.webp"),
      },
      {
        name: t("food.seta"),
        img: require("../../assets/food/frutasverduras/seta.webp"),
      },
      {
        name: t("food.tomate"),
        img: require("../../assets/food/frutasverduras/tomate.webp"),
      },
      {
        name: t("food.yuca"),
        img: require("../../assets/food/frutasverduras/yuca.webp"),
      },
    ],
  };

  return meatTypes
}
export default foodTypes
