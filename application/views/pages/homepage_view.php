<div id="mainSearch">
    <p>Encuentre su pr&oacute;ximo carro aqu&iacute;</p>
    <form action="/buscar" method="post" id="mainSearchForm" class="form-inline" noValidate autocomplete="off">
        <?php
            $csrf = array(
                'name' => $this->security->get_csrf_token_name(),
                'hash' => $this->security->get_csrf_hash()
            );
        ?>
        <input id="csrf_token" type="hidden" name="<?=$csrf['name'];?>" value="<?=$csrf['hash'];?>" />
        <div class="form-group">
            <div class="suggestWrapper">
                <!--<label for="searchMake" class="arrow_box">Test label</label>-->
                <input type="text" class="form-control form-control-lg suggestInput" name="make" id="searchMake" data-searchtype="make" value="" placeholder="Marca" pattern="[a-z]" data-error="AlphaNuneric characters only" required>
                <ul id="makeSuggestions" class="suggestList"></ul>
            </div>
            <div class="suggestWrapper">
                <input type="text" class="form-control form-control-lg suggestInput" name="model" id="searchModel" data-searchtype="model" value="" placeholder="Modelo" required>
                <ul id="modelSuggestions" class="suggestList"></ul>
            </div>
            <div class="suggestWrapper">
                <input type="text" class="form-control form-control-lg" name="year" id="searchYear" value="" placeholder="A&ntilde;o">
            </div>
            <button class="btn btn-dark" type="submit">Buscar <i class="material-icons md-36 md-accent">search</i></button>
        </div>
    </form>
    <span>12875 carros disponibles</span>
</div>