/* ========================================
   PULSETECH
   PRODUTOS - CAIXAS DE SOM
======================================== */

const produtos = [

    {
        id: 1,
        nome: "Caixa de Som Bluetooth X1",
        descricao: "Caixa portátil com Bluetooth e bateria recarregável.",
        precoAntigo: 149.90,
        preco: 99.90,
        categoria: "caixas",
        imagem: "🔊"
    },

    {
        id: 2,
        nome: "Caixa de Som Bluetooth Pro",
        descricao: "Som potente para festas, viagens e uso diário.",
        precoAntigo: 199.90,
        preco: 139.90,
        categoria: "caixas",
        imagem: "🔊"
    },

    {
        id: 3,
        nome: "Mini Caixa de Som",
        descricao: "Compacta, portátil e fácil de levar para qualquer lugar.",
        precoAntigo: 89.90,
        preco: 59.90,
        categoria: "caixas",
        imagem: "🔈"
    },

    {
        id: 4,
        nome: "Caixa de Som Power",
        descricao: "Modelo maior para quem procura mais potência.",
        precoAntigo: 299.90,
        preco: 219.90,
        categoria: "caixas",
        imagem: "🔊"
    },

    {
        id: 5,
        nome: "Caixa de Som Party",
        descricao: "Ideal para festas e encontros com amigos.",
        precoAntigo: 349.90,
        preco: 249.90,
        categoria: "caixas",
        imagem: "🎵"
    },

    {
        id: 6,
        nome: "Caixa de Som Portátil",
        descricao: "Leve sua música para qualquer lugar.",
        precoAntigo: 129.90,
        preco: 89.90,
        categoria: "caixas",
        imagem: "🔉"
    }

];


/* ========================================
   CARRINHO
======================================== */

let carrinho = [];


/* ========================================
   FORMATAÇÃO DE PREÇO
======================================== */

function formatarPreco(valor) {

    return valor.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


/* ========================================
   MOSTRAR PRODUTOS
======================================== */

function mostrarProdutos() {

    const area =
        document.getElementById("listaProdutos");

    area.innerHTML = "";


    produtos.forEach(produto => {

        const card =
            document.createElement("article");

        card.className = "product";


        card.innerHTML = `

            <div class="product-image">
                ${produto.imagem}
            </div>

            <div class="product-info">

                <p class="product-category">
                    🔥 OFERTA
                </p>

                <h3>
                    ${produto.nome}
                </h3>

                <p class="product-description">
                    ${produto.descricao}
                </p>

                <div class="old-price">
                    De ${formatarPreco(produto.precoAntigo)}
                </div>

                <div class="product-price">
                    ${formatarPreco(produto.preco)}
                </div>

                <button
                    class="buy-button"
                    onclick="adicionarCarrinho(${produto.id})"
                >
                    🛒 COMPRAR AGORA
                </button>

            </div>

        `;


        area.appendChild(card);

    });

}


/* ========================================
   ADICIONAR AO CARRINHO
======================================== */

function adicionarCarrinho(id) {

    const produto =
        produtos.find(
            item => item.id === id
        );


    const existente =
        carrinho.find(
            item => item.id === id
        );


    if (existente) {

        existente.quantidade++;

    }

    else {

        carrinho.push({

            ...produto,

            quantidade: 1

        });

    }


    atualizarCarrinho();

    abrirCarrinho();

}


/* ========================================
   REMOVER PRODUTO
======================================== */

function removerCarrinho(id) {

    carrinho =
        carrinho.filter(
            item => item.id !== id
        );


    atualizarCarrinho();

}


/* ========================================
   ATUALIZAR CARRINHO
======================================== */

function atualizarCarrinho() {

    const quantidade =
        carrinho.reduce(
            (total, item) =>
                total + item.quantidade,
            0
        );


    document
        .getElementById("quantidadeCarrinho")
        .textContent = quantidade;


    const area =
        document.getElementById("itensCarrinho");


    if (carrinho.length === 0) {

        area.innerHTML = `

            <p style="
                color:#777;
                margin-top:25px;
            ">

                Seu carrinho está vazio.

            </p>

        `;

    }

    else {

        area.innerHTML = "";


        carrinho.forEach(item => {

            const div =
                document.createElement("div");


            div.className = "cart-item";


            div.innerHTML = `

                <div>

                    <div class="cart-item-name">

                        ${item.imagem}
                        ${item.nome}

                    </div>

                    <div class="cart-item-price">

                        ${item.quantidade} ×
                        ${formatarPreco(item.preco)}

                    </div>

                </div>

                <button
                    class="remove-button"
                    onclick="removerCarrinho(${item.id})"
                >

                    Remover

                </button>

            `;


            area.appendChild(div);

        });

    }


    const total =
        carrinho.reduce(

            (soma, item) =>

                soma +
                item.preco *
                item.quantidade,

            0

        );


    document
        .getElementById("totalCarrinho")
        .textContent =
        formatarPreco(total);

}


/* ========================================
   ABRIR CARRINHO
======================================== */

function abrirCarrinho() {

    document
        .getElementById("cartOverlay")
        .classList.add("show");

}


/* ========================================
   FECHAR CARRINHO
======================================== */

function fecharCarrinho(event) {

    if (
        !event ||
        event.target.id === "cartOverlay"
    ) {

        document
            .getElementById("cartOverlay")
            .classList.remove("show");

    }

}


/* ========================================
   FINALIZAR PEDIDO
======================================== */

function finalizarPedido() {

    if (carrinho.length === 0) {

        alert(
            "Seu carrinho está vazio!"
        );

        return;

    }


    /*
        DEPOIS VAMOS COLOCAR
        SEU WHATSAPP AQUI.

        NÃO PRECISA ALTERAR AGORA.
    */

    const numeroWhatsApp =
        "5555999999999";


    let mensagem =
        "Olá! Quero fazer um pedido na PulseTech:%0A%0A";


    carrinho.forEach(item => {

        mensagem +=

            `${item.quantidade}x ` +
            `${item.nome} - ` +
            `${formatarPreco(
                item.preco *
                item.quantidade
            )}%0A`;

    });


    const total =
        carrinho.reduce(

            (soma, item) =>

                soma +
                item.preco *
                item.quantidade,

            0

        );


    mensagem +=

        `%0A💰 Total: ` +
        `${formatarPreco(total)}`;


    const url =

        `https://wa.me/` +
        `${numeroWhatsApp}` +
        `?text=${mensagem}`;


    window.open(
        url,
        "_blank"
    );

}


/* ========================================
   INICIAR SITE
======================================== */

mostrarProdutos();

atualizarCarrinho();