export class CaixaDaLanchonete {
    calcularValorDaCompra(formaDePagamento, itens) {
        const cardapio = [
            { codigo: 'cafe', valor: 3.0 },
            { codigo: 'chantily', valor: 1.5 },
            { codigo: 'suco', valor: 6.2 },
            { codigo: 'sanduiche', valor: 6.5 },
            { codigo: 'queijo', valor: 2.0 },
            { codigo: 'salgado', valor: 7.25 },
            { codigo: 'combo1', valor: 9.5 },
            { codigo: 'combo2', valor: 7.5 }
        ];

        const formasPagamento = ['debito', 'credito', 'dinheiro'];

        if (!formasPagamento.includes(formaDePagamento)) {
            return "Forma de pagamento inválida!";
        }

        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        let total = 0;

        for (let i = 0; i < itens.length; i++) {
            const itemInfo = itens[i].split(',');
            const codigoItem = itemInfo[0].trim();
            const quantidade = itemInfo[1] ? parseInt(itemInfo[1].trim()) : parseInt(itemInfo[1]);

            const item = cardapio.find(item => item.codigo === codigoItem);

            if (!item) {
                return "Item inválido!";
            }

            if (quantidade === 0 || isNaN(quantidade)) {
                return "Quantidade inválida!";
            }

            total += item.valor * quantidade;
        }

        const itensArray = itens.map(i => i.split(",")[0]);

        if (itensArray.includes('chantily') && !itensArray.includes('cafe')) {
            return "Item extra não pode ser pedido sem o principal";
        }

        if (itensArray.includes('queijo') && !itensArray.includes('sanduiche')) {
            return "Item extra não pode ser pedido sem o principal";
        }

        if (formaDePagamento === 'dinheiro') {
            total *= 0.95;
        } else if (formaDePagamento === 'credito') {
            total *= 1.03;
        }

        const result = `R$ ${total.toFixed(2)}`.replace(/\./g, ",");

        return result;
    }
};