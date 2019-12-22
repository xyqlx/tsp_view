<template>
    <div id="app">
        <Row>
            <i-Col span="6">
                <ParameterContainer/>
            </i-Col>
            <i-Col span="18">
                <DataView/>
            </i-Col>
        </Row>
    </div>
</template>

<script>
    import ParameterContainer from './components/ParameterContainer.vue';
    import DataView from './components/DataView.vue';

    export default {
        name: 'app',
        components: {
            ParameterContainer,
            DataView
        }
    };
</script>

<style>
</style>

