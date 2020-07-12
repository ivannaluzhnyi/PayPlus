export default function (allProducts, productsToRemove) {

    // console.log("allProducts =>", allProducts)
    // console.log("productsToRemove => ", productsToRemove )
    const newAllProducts = [];
    const refundedProducts = [];

    allProducts.forEach(prd => {
      const allIds = Object.keys(productsToRemove);

      const {
        qte,
        product: { _id }
      } = prd;

      if (allIds.includes(_id)) {
        const finedQte = productsToRemove[_id];

        if (qte > finedQte) {
          newAllProducts.push({
            ...prd,
            qte: qte - finedQte
          });

          refundedProducts.push({
            ...prd,
            qte: finedQte
          });
        } else {
          refundedProducts.push({
            ...prd,
            qte: finedQte
          });
        }
      } else {
        newAllProducts.push(prd);
      }
    });
    return {    
      newAllProducts,
      refundedProducts
    };
  };
