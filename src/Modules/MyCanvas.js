import * as THREE from 'three';

const MyCanvas = {
    el: null,
    container: null,
    width: 0,
    height: 0,
    pixelRatio: Math.min(window.devicePixelRatio || 1, 2),

    create(container = document.body, options = {}) {
        if (this.el) return this; // already created
        this.container = container;
        const el = this.el = document.createElement('canvas');
        if (options.id) el.id = options.id;
        if (options.className) el.className = options.className;
        container.appendChild(el);

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, el.offsetWidth / el.offsetHeight, 0.1, 1000 );

        this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas: el ,alpha: true });
        this.renderer.setSize( el.offsetWidth, el.offsetHeight );
        
        this.resizeObserver = new ResizeObserver(this.resize.bind(this));
        this.resizeObserver.observe(container);

        return this;
    },

    resize(entries) {
        if(entries){
            const me = entries.filter(entry => entry.target === this.container)[0];
            if(me){
                this.width = me.contentRect.width;
                this.height = me.contentRect.height;
                this.camera.aspect = this.width / this.height;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize(this.width, this.height);
                this.pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
                this.renderer.setPixelRatio(this.pixelRatio);
            }
        }
    },

    getMyCanvas() {
        return this.el;
    },

    getSize() {
        return { width: this.width, height: this.height, pixelRatio: this.pixelRatio };
    },

    getContext(type = 'webgl2', options = {}) {
        if (!this.el) return null;
        return this.el.getContext(type, options);
    },

    destroy() {
        if (!this.el) return;
        if (this.el.parentNode) this.el.parentNode.removeChild(this.el);
        this.el = null;
        this.container = null;
        this._boundResize = null;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.resizeObserver.disconnect();
        this.resizeObserver = null;
        return this;
    }
};

export default MyCanvas;